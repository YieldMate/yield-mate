// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

interface IVault {
    function deposit(
        address _token,
        uint256 _amount,
        uint256 _orderId
    ) external;

    function withdraw(uint256 _orderId) external;
}
