// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

struct OrderInfo {
    address assetIn;
    address assetOut;
    uint256 amountIn;
    uint256 targetPrice;
    OrderStatus status;
    OrderType orderType;
}

struct OrderStatus {
    Status status;
    uint256 amountOut;
}

enum Status {
    PENDING,
    EXECUTED,
    WITHDRAWN,
    CANCELED
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
