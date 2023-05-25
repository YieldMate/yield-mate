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
        address recipient
    ) public returns (uint256 amountOut) {
        uint256 _amountOut = quoter.getQuote(tokenIn, tokenOut, amountIn);
        console.log("amountOutQuote: ", _amountOut);
        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountIn);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: POOL_FEE,
                recipient: recipient,
                deadline: block.timestamp + 10,
                amountIn: amountIn,
                amountOutMinimum: _amountOut - _amountOut / 10, // 2% slippage // TODO: slippage should be configurable by the user
                sqrtPriceLimitX96: 0 // TODO: maybe this should be loaded from pool.slot0()
            });

        console.log("amountOutMinimum: ", params.amountOutMinimum);
        amountOut = swapRouter.exactInputSingle(params);
        console.log("amountOut: ", amountOut);
    }
}
