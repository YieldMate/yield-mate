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

struct OrderStatus {
    bool executed;
    uint256 amountOut;
}

enum OrderType {
    BUY,
    SELL
}

enum Modules {
    QUOTER,
    SWAPER,
    VAULT,
    KEEPER
}
