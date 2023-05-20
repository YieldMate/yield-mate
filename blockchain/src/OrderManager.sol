// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import {AssetInfo} from "./lib/Objects.sol";
import "./lib/Errors.sol";

contract OrderManager {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    Counters.Counter orderId;

    mapping(address => uint256) internal userToOrderMapping;
    mapping(uint256 => AssetInfo) internal ordersMapping;
    EnumerableSet.UintSet internal orders; // we store here orderIds'

    function addOrder(
        address _token,
        uint256 _amount,
        uint256 _price
    ) external returns (uint256) {
        (bool success, ) = _token.call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                msg.sender,
                address(this),
                _amount
            )
        );

        if (!success) revert TransferFailed();

        uint256 _orderId = orderId.current();

        // bind orderId to user
        userToOrderMapping[msg.sender] = _orderId;

        // save the detail of order
        ordersMapping[_orderId] = AssetInfo({asset: _token, price: _price});

        // add orderId to orders array
        orders.add(_orderId);

        orderId.increment();
        return _orderId;
    }

    function executeOrders() external {
        // TODO: execute orders
    }

    function getEligbleOrders() external view returns (AssetInfo[] memory) {
        // get current orders
        AssetInfo[] memory _orders = new AssetInfo[](orders.length());

        for (uint256 i = 0; i < orders.length(); i++) {
            _orders[i] = ordersMapping[orders.at(i)];
        }

        return _orders;
        // determine which orders meet conditions and return them
    }
}
