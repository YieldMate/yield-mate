// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import {AssetInfo} from "./lib/Objects.sol";

interface IOrderManager {
    function addOrder(
        address _token,
        uint256 _amount,
        uint256 _price
    ) external returns (uint256);

    function executeOrders() external;

    function getEligbleOrders() external view;
    // returns (AssetInfo[] memory);
}