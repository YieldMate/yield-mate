// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {OrderInfo, OrderStatus, OrderType, PriceInfo} from "./lib/Objects.sol";
import {IQuoter} from "../order-manager/price-engine/IQuoter.sol";
import {ISwaper} from "../order-manager/swaper/ISwaper.sol";
import "./lib/Errors.sol";
import "forge-std/console.sol";

interface IERC20 {
    function decimals() external view returns (uint8);
}

contract OrderManager {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    IQuoter private quoter;
    ISwaper private swaper;

    Counters.Counter orderId;

    mapping(address => uint256) internal userToOrderMapping;
    mapping(uint256 => OrderInfo) internal ordersMapping;
    EnumerableSet.UintSet internal orders; // we store here orderIds'

    modifier isPoolValid(address _tokenIn, address _tokenOut) {
        if (!quoter.isPoolValid(_tokenIn, _tokenOut)) {
            revert("pool is not valid");
        }
        _;
    }

    constructor(address _quoter, address _swaper) {
        quoter = IQuoter(_quoter);
        swaper = ISwaper(_swaper);
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
        userToOrderMapping[msg.sender] = _orderId;

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

        return _orderId;
    }

    function executeOrders(uint256[] memory _offersIds) external {
        for (uint256 i = 0; i < _offersIds.length; i++) {
            OrderInfo memory _orderInfo = ordersMapping[_offersIds[i]];
            if (_orderInfo.status.executed) {} else {
                _executeOrder(_orderInfo, _offersIds[i]);
            }
            console.log(
                "+++++++++++++++++++++++++++++++++AAAA++++++++++++++++++++++++++++++"
            );
        }
    }

    function _executeOrder(
        OrderInfo memory _orderInfo,
        uint256 _orderId
    ) internal {
        if (_orderId == 0) revert OrderNotFound();
        (bool success, ) = _orderInfo.assetIn.call(
            abi.encodeWithSignature(
                "transfer(address,uint256)",
                address(swaper),
                _orderInfo.amountIn
            )
        );

        if (!success) revert TransferFailed();

        (uint256 _price, uint256 _estAmountOut) = fetchOrderDetails(_orderInfo);

        console.log(
            "OrderManager:106 orderId: %s   price: %s",
            _orderId,
            _price
        );

        uint160 _sqrtPriceX96 = quoter.reversePriceToSqrt(
            _orderInfo.targetPrice
        );

        // execute order
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

        console.log("arrLength: %s", arrLength);

        eligbleOrdersIds = new uint256[](arrLength);

        uint256 _index = 0;

        for (uint256 i = 0; i < arrLength; i++) {
            OrderInfo memory _orderInfo = ordersMapping[orders.at(i)];

            // if we want to buy tokenB for tokenA we want to know how much 1 tokenB is worth in A (ex. 1000 USDT for WMATIC)
            console.log("OrderManager:146 orderId: %s", orders.at(i));

            (uint256 _price, ) = fetchOrderDetails(_orderInfo);

            console.log("====================================");

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
            console.log("OrderManager:165 eligible: %s", _eligible[i]);
        }
        return _eligible;
    }

    function fetchOrderDetails(
        OrderInfo memory _orderInfo
    ) internal view returns (uint256 _price, uint256 _estAmountOut) {
        console.log("OrderManager:179 fetchingOrders");

        if (_orderInfo.orderType == OrderType.BUY) {
            _price = quoter.getQuote(
                _orderInfo.assetOut,
                _orderInfo.assetIn,
                1 * 10 ** IERC20(_orderInfo.assetOut).decimals()
            );
            console.log("OrderManager:182 price:", _price);
            _estAmountOut =
                (_orderInfo.amountIn *
                    10 ** IERC20(_orderInfo.assetOut).decimals()) /
                _price;
            // we sell - simple
        } else {
            _price = quoter.getQuote(
                _orderInfo.assetIn,
                _orderInfo.assetOut,
                1 * 10 ** IERC20(_orderInfo.assetIn).decimals()
            );

            _estAmountOut =
                (_orderInfo.amountIn * _price) /
                10 ** IERC20(_orderInfo.assetIn).decimals();
        }
        console.log("OrderManager:197 estAmountOut: ", _estAmountOut);
        console.log(
            "OrderManager:199 price: %s  targetPrice: %s",
            _price,
            _orderInfo.targetPrice
        );
    }
}
