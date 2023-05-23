// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {OrderInfo, OrderStatus, OrderType, PriceInfo} from "./lib/Objects.sol";
import {Quoter} from "../price-engine/Quoter.sol";
import "./lib/Errors.sol";
import "forge-std/console.sol";

interface IERC20 {
    function decimals() external view returns (uint8);
}

contract OrderManager {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    Quoter private quoter;

    Counters.Counter orderId;

    mapping(address => uint256) internal userToOrderMapping;
    mapping(uint256 => OrderInfo) internal ordersMapping;
    EnumerableSet.UintSet internal orders; // we store here orderIds'

    // pool address to price info struct (last price, updateAt)
    mapping(address => PriceInfo) internal priceMappings;

    modifier isPoolValid(address _tokenIn, address _tokenOut) {
        if (!quoter.isPoolValid(_tokenIn, _tokenOut)) {
            revert("pool is not valid");
        }
        _;
    }

    constructor(address _quoter) {
        quoter = Quoter(_quoter);
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

        orderId.increment();
        return _orderId;
    }

    function executeOrders(uint256[] memory _offersIds) external {
        // TODO: execute orders
    }

    function getEligbleOrders()
        external
        view
        returns (uint256[] memory eligbleOrdersIds)
    {
        uint256 arrLength = orders.length();
        eligbleOrdersIds = new uint256[](arrLength);

        uint256 _index = 0;

        for (uint256 i = 0; i < arrLength; i++) {
            OrderInfo memory _orderInfo = ordersMapping[orders.at(i)];

            uint256 _price;

            // if we want to buy tokenB for tokenA we want to know how much 1 tokenB is worth in A (ex. 1000 USDT for WMATIC)
            if (_orderInfo.orderType == OrderType.BUY) {
                _price = quoter.getQuote(
                    _orderInfo.assetOut,
                    _orderInfo.assetIn,
                    1 * 10 ** IERC20(_orderInfo.assetOut).decimals()
                );
                // we sell - simple
            } else {
                _price = quoter.getQuote(
                    _orderInfo.assetIn,
                    _orderInfo.assetOut,
                    1 * 10 ** IERC20(_orderInfo.assetIn).decimals()
                );
            }

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
        return eligbleOrdersIds;
    }
}
