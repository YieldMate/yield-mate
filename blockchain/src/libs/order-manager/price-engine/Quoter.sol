// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/OracleLibrary.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";

contract Quoter {
    ISwapRouter public router;
    IUniswapV3Factory factory;

    uint24 public constant poolFee = 3000;

    constructor(address _factory, address _router) {
        factory = IUniswapV3Factory(_factory);
        router = ISwapRouter(_router);
    }

    function isPoolValid(
        address tokenIn,
        address tokenOut
    ) external view returns (bool) {
        return factory.getPool(tokenIn, tokenOut, poolFee) != address(0);
    }

    function getQuote(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external view returns (uint256 amountOut) {
        address pool = factory.getPool(tokenIn, tokenOut, poolFee);

        require(pool != address(0), "Could not find pool");
        (int24 arithmeticMeanTick, ) = OracleLibrary.consult(pool, 5);

        amountOut = OracleLibrary.getQuoteAtTick(
            arithmeticMeanTick,
            uint128(amountIn),
            tokenIn,
            tokenOut
        );
    }

    function reversePriceToSqrt(
        uint256 price
    ) external pure returns (uint160 sqrtPriceX96) {
        uint256 sqrtPriceX96Squared = (price << (96 * 2)) / 1e18;
        sqrtPriceX96 = uint160(sqrt(sqrtPriceX96Squared));
        return sqrtPriceX96;
    }

    function sqrt(uint x) public pure returns (uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
