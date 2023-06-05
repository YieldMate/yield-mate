// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {OrderInfo, OrderStatus, OrderType, Modules} from "./lib/Objects.sol";
import {IQuoter} from "../order-manager/price-engine/IQuoter.sol";
import {Swaper} from "../order-manager/swaper/Swaper.sol";
import {IVault} from "../vault/IVault.sol";

import "./lib/Errors.sol";

import "forge-std/StdUtils.sol";

import "forge-std/console.sol";

interface IERC20 {
    function decimals() external view returns (uint8);
}

contract OrderManager {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    IQuoter private quoter;
    Swaper private swaper;
    IVault private vault;
    address private keeper;
    address private admin;

    Counters.Counter orderId;

    mapping(address => mapping(uint256 => uint256)) internal userToOrderMapping;
    mapping(address => uint256) internal userToOrderCountMapping; // how many orders user has
    mapping(uint256 => OrderInfo) public ordersMapping;
    EnumerableSet.UintSet internal orders; // we store here orderIds'

    modifier isPoolValid(address _tokenIn, address _tokenOut) {
        if (!quoter.isPoolValid(_tokenIn, _tokenOut)) {
            revert("pool is not valid");
        }
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setUpModule(Modules _moduleType, address _moduleAddress) external {
        if (msg.sender != admin) {
            revert("onlyAdmin");
        }
        if (_moduleType == Modules.QUOTER) {
            quoter = IQuoter(_moduleAddress);
        } else if (_moduleType == Modules.SWAPER) {
            swaper = Swaper(_moduleAddress);
        } else if (_moduleType == Modules.VAULT) {
            vault = IVault(_moduleAddress);
        } else if (_moduleType == Modules.KEEPER) {
            keeper = _moduleAddress;
        } else {
            revert("invalidModule");
        }
    }

    function depositToVault(
        OrderInfo memory _order,
        uint256 _orderId
    ) internal {
        address(_order.assetIn).call(
            abi.encodeWithSignature(
                "approve(address,uint256)",
                address(vault),
                _order.amountIn
            )
        );
        vault.deposit(_order.assetIn, _order.amountIn, _orderId);
    }

    function addOrder(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _price,
        OrderType _orderType
    ) external isPoolValid(_tokenIn, _tokenOut) returns (uint256) {
        (bool success, ) = _tokenIn.call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                msg.sender,
                address(this),
                _amountIn
            )
        );

        if (!success) revert TransferFailed();

        orderId.increment();
        uint256 _orderId = orderId.current();

        // bind orderId to user
        userToOrderMapping[msg.sender][
            userToOrderCountMapping[msg.sender]
        ] = _orderId;

        if (userToOrderCountMapping[msg.sender] == 0)
            userToOrderCountMapping[msg.sender] = 1;
        else userToOrderCountMapping[msg.sender] += 1;

        // save the detail of order
        ordersMapping[_orderId] = OrderInfo({
            assetIn: _tokenIn,
            targetPrice: _price,
            assetOut: _tokenOut,
            amountIn: _amountIn,
            status: OrderStatus({executed: false, amountOut: 0}),
            orderType: _orderType
        });

        // add orderId to orders array
        orders.add(_orderId);

        depositToVault(ordersMapping[_orderId], _orderId);

        return _orderId;
    }

    function executeOrders(uint256[] memory _offersIds) external {
        if (msg.sender != keeper) revert("!keeper");
        if (_offersIds.length == 0) revert("noOrdersToExecute");

        for (uint256 i = 0; i < _offersIds.length; i++) {
            OrderInfo memory _orderInfo = ordersMapping[_offersIds[i]];

            if (_orderInfo.status.executed) {} else {
                uint256 _amount = vault.withdraw(
                    _orderInfo.assetIn,
                    _offersIds[i]
                );

                _orderInfo.amountIn = _amount;
                _executeOrder(_orderInfo, _offersIds[i]);
            }
        }
    }

    function _executeOrder(
        OrderInfo memory _orderInfo,
        uint256 _orderId
    ) internal {
        if (_orderId == 0) revert OrderNotFound();

        /// @dev we sent tokens to swaper
        (bool success, ) = _orderInfo.assetIn.call(
            abi.encodeWithSignature(
                "transfer(address,uint256)",
                address(swaper),
                _orderInfo.amountIn
            )
        );

        if (!success) revert TransferFailed();

        (uint256 _price, uint256 _estAmountOut) = fetchOrderDetails(_orderInfo);

        uint160 _sqrtPriceX96;

        if (_orderInfo.orderType == OrderType.BUY) {
            _sqrtPriceX96 = quoter.reversePriceToSqrt(_orderInfo.targetPrice);
        } else {
            _sqrtPriceX96 = quoter.reversePriceToSqrt(_price);
        }

        // perform a swap
        uint256 _amountOut = swaper.swapExactInputSingle(
            _orderInfo.assetIn,
            _orderInfo.assetOut,
            _orderInfo.amountIn,
            _estAmountOut,
            _sqrtPriceX96,
            address(this)
        );

        // update order status
        _orderInfo.status = OrderStatus({
            executed: true,
            amountOut: _amountOut
        });

        // update order info
        ordersMapping[_orderId] = _orderInfo;
    }

    function getEligbleOrders()
        external
        view
        returns (uint256[] memory eligbleOrdersIds)
    {
        uint256 arrLength = orders.length();

        eligbleOrdersIds = new uint256[](arrLength);

        /// @dev index for inserting eligible orders
        uint256 _index = 0;

        /// @dev iterate ove all orders
        for (uint256 i = 0; i < arrLength; i++) {
            OrderInfo memory _orderInfo = ordersMapping[orders.at(i)];

            (uint256 _price, ) = fetchOrderDetails(_orderInfo);

            if (
                (_orderInfo.orderType == OrderType.SELL &&
                    _price >= _orderInfo.targetPrice) ||
                (_orderInfo.orderType == OrderType.BUY &&
                    _price <= _orderInfo.targetPrice)
            ) {
                eligbleOrdersIds[_index] = orders.at(i);
                _index++;
            }
        }

        uint256[] memory _eligible = new uint256[](_index);
        for (uint256 i = 0; i < _index; i++) {
            _eligible[i] = eligbleOrdersIds[i];
        }
        return _eligible;
    }

    /// @dev fetch order details - current price and estimated amountOut
    function fetchOrderDetails(
        OrderInfo memory _orderInfo
    ) internal view returns (uint256 _price, uint256 _estAmountOut) {
        /// @dev if order is buy, then we need to get price of assetOut in assetIn
        if (_orderInfo.orderType == OrderType.BUY) {
            _price = quoter.getQuote(
                _orderInfo.assetOut,
                _orderInfo.assetIn,
                1 * 10 ** IERC20(_orderInfo.assetOut).decimals()
            );
            _estAmountOut =
                (_orderInfo.amountIn *
                    10 ** IERC20(_orderInfo.assetOut).decimals()) /
                _price;
        } else {
            /// @dev if order is sell, then we need to get price of assetIn in assetOut
            _price = quoter.getQuote(
                _orderInfo.assetIn,
                _orderInfo.assetOut,
                1 * 10 ** IERC20(_orderInfo.assetIn).decimals()
            );

            _estAmountOut =
                (_orderInfo.amountIn * _price) /
                10 ** IERC20(_orderInfo.assetIn).decimals();
        }
    }
}
