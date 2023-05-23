// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import {OrderInfo, OrderStatus, OrderType} from "./lib/Objects.sol";
import {Quoter} from "../price-engine/Quoter.sol";
import "./lib/Errors.sol";
import "forge-std/console.sol";

contract OrderManager {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    Quoter private quoter;

    Counters.Counter orderId;

    mapping(address => uint256) internal userToOrderMapping;
    mapping(uint256 => OrderInfo) internal ordersMapping;
    EnumerableSet.UintSet internal orders; // we store here orderIds'

    constructor(address _quoter) {
        quoter = Quoter(_quoter);
    }

    function addOrder(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _price,
        OrderType _orderType
    ) external returns (uint256) {
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

    function executeOrders() external {
        // TODO: execute orders
    }

    function getEligbleOrders() external view returns (uint256[] memory) {
        uint256[] memory eligbleOrdersIds = new uint256[](orders.length());

        uint256 _index = 0;

        for (uint256 i = 0; i < orders.length(); i++) {
            OrderInfo memory _orderInfo = ordersMapping[orders.at(i)];
            uint256 _price = quoter.getQuote(
                _orderInfo.assetIn,
                _orderInfo.assetOut,
                _orderInfo.amountIn
            );

            if (
                (_orderInfo.orderType == OrderType.SELL &&
                    _price >= _orderInfo.targetPrice) ||
                (_orderInfo.orderType == OrderType.BUY &&
                    _price <= _orderInfo.targetPrice)
            ) {
                eligbleOrdersIds[_index] = i;
                _index++;
            }

            return eligbleOrdersIds;
        }

        // TODO: determine which orders meet conditions and return them

        // console.logBytes(abi.encode(_orders));

        // return abi.encode(_orders);
    }
}
