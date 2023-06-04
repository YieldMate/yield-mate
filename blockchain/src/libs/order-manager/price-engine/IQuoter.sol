// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

interface IQuoter {
    function isPoolValid(
        address tokenIn,
        address tokenOut
    ) external view returns (bool);

    function getQuote(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external view returns (uint256 amountOut);

    function reversePriceToSqrt(
        uint256 price
    ) external pure returns (uint160 sqrtPriceX96);
}
