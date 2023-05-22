// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import {OrderInfo, OrderStatus, OrderType} from "./lib/Objects.sol";
import {PriceEngine} from "../price-engine/PriceEngine.sol";
import "./lib/Errors.sol";
import "forge-std/console.sol";

contract OrderManager {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    PriceEngine private engine;

    Counters.Counter orderId;

    mapping(address => uint256) internal userToOrderMapping;
    mapping(uint256 => OrderInfo) internal ordersMapping;
    EnumerableSet.UintSet internal orders; // we store here orderIds'

    constructor(address _engine) {
        engine = PriceEngine(_engine);
    }

    function addOrder(
        address _tokenIn,
        uint256 _amountIn,
        uint256 _targetPrice,
        address _assetOut,
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
            targetPrice: _targetPrice,
            assetOut: _assetOut,
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

    function getEligbleOrders() external view returns (bytes memory) {
        // get current orders
        OrderInfo[] memory _orders = new OrderInfo[](orders.length());

        for (uint256 i = 0; i < orders.length(); i++) {
            OrderInfo memory _orderInfo = ordersMapping[orders.at(i)];

            // _orderInfo.
        }

        // TODO: determine which orders meet conditions and return them

        // console.logBytes(abi.encode(_orders));

        // return abi.encode(_orders);
    }
}
