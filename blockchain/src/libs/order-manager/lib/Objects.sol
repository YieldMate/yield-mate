// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
struct OrderInfo {
    address assetIn;
    address assetOut;
    uint256 amountIn;
    uint256 targetPrice;
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

struct PriceInfo {
    uint256 price;
    uint256 updatedAt;
}
