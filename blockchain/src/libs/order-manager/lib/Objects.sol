// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
struct OrderInfo {
    address assetIn;
    uint256 targetPrice;
    address assetOut;
    uint256 amountIn;
    OrderStatus status;
    OrderType orderType;
}

enum OrderType {
    BUY,
    SELL
}

struct OrderStatus {
    bool executed;
    uint256 amountOut;
}
