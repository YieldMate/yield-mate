// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Objects.sol";

error TransferFailed();
error OrderNotFound();
error UnsupportedToken();
error InvalidOrderId();

library Events {
    event ModuleSetUp(Modules module, address moduleAddress);
    event DepositToVault(
        uint256 indexed orderId,
        address assetIn,
        uint256 amountIn
    );
    event WithdrawFromVault(
        uint256 indexed orderId,
        address assetIn,
        uint256 amount
    );
    event OrderExecuted(uint256 indexed orderId);
    event OrderAdded(
        uint256 indexed orderId,
        address assetIn,
        address assetOut,
        uint256 amountIn,
        uint256 targetPrice,
        OrderType orderType
    );
    event OrderCanceled(uint256 indexed orderId);
}
