// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

interface ISwaper {
    function swapExactInputSingle(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 estAmountOut,
        uint160 sqrtPriceLimitX96,
        address recipient
    ) external returns (uint256 amountOut);
}
