// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IOrderManager {
    function addOrder(
        address _token,
        uint256 _amount,
        uint256 _price
    ) external returns (uint256);

    function executeOrders(uint256[] memory) external;

    function getEligibleOrders() external view returns (uint256[] memory);
}
