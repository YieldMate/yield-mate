// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.19;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

import {IQuoter} from "../price-engine/IQuoter.sol";

import "forge-std/console.sol";

contract Swaper {
    ISwapRouter public immutable swapRouter;
    IQuoter public quoter;

    uint24 public constant POOL_FEE = 3000;

    constructor(address _swapRouter, address _quoter) {
        swapRouter = ISwapRouter(_swapRouter);
        quoter = IQuoter(_quoter);
    }

    function swapExactInputSingle(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 estAmountOut,
        uint160 sqrtPriceLimitX96,
        address recipient
    ) public returns (uint256 amountOut) {
        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountIn);
        console.log("Swaper:30 executingSwap");
        console.log("tokenIn: ", tokenIn);
        console.log("tokenOut: ", tokenOut);
        console.log("amountIn: ", amountIn);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: POOL_FEE,
                recipient: recipient,
                deadline: block.timestamp + 10,
                amountIn: amountIn,
                amountOutMinimum: 0,
                // amountOutMinimum: estAmountOut - estAmountOut / 100, // 1% slippage // TODO: slippage should be configurable by the user
                sqrtPriceLimitX96: sqrtPriceLimitX96 // TODO: maybe this should be loaded from pool.slot0()
            });
        // TODO: if run with amountOutMinimum the slippage is too high and we receive to little tokens

        console.log("estAmountOut: ", estAmountOut);
        console.log("amountOutMinimum: ", params.amountOutMinimum);
        amountOut = swapRouter.exactInputSingle(params);
        console.log("amountOut: ", amountOut);
    }
}
