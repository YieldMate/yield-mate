// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.20;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

import "forge-std/console.sol";

contract Swaper {
    ISwapRouter public immutable swapRouter;
    address private orderManager;

    uint24 public constant POOL_FEE = 3000;

    constructor(address _swapRouter, address _orderManager) {
        swapRouter = ISwapRouter(_swapRouter);
        orderManager = _orderManager;
    }

    function swapExactInputSingle(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 estAmountOut,
        uint160 sqrtPriceLimitX96,
        address recipient
    ) external returns (uint256 amountOut) {
        if (msg.sender != orderManager) {
            revert("only orderManager can call this function");
        }

        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountIn);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: POOL_FEE,
                recipient: recipient,
                deadline: block.timestamp + 5,
                amountIn: amountIn,
                amountOutMinimum: estAmountOut - estAmountOut / 100, // 1% slippage // TODO: think if slippage should be set by user
                sqrtPriceLimitX96: 0 // sqrtPriceLimitX96
            });
        amountOut = swapRouter.exactInputSingle(params);
    }
}
