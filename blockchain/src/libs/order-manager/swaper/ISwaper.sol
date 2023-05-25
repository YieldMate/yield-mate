// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

interface ISwaper {
    function swapExactInputSingle(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address recipient
    ) external returns (uint256 amountOut);
}
