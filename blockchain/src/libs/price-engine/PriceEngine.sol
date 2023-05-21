//SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";

import "forge-std/console.sol";

interface IERC20 {
    function decimals() external view returns (uint256);
}

contract UniswapV3Twap {
    address public immutable factory =
        0x1F98431c8aD98523631AE4a59f267346ea31F984;
    uint24 public fee = 3000;

    function getPrice()
        external
        view
        returns (
            // address tokenIn,
            // address tokenOut
            uint256
        )
    {
        address _pool = IUniswapV3Factory(factory).getPool(
            0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174, //  tokenIn
            0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270, // tokenOut,
            fee
        );
        console.log("pool", _pool);
        require(_pool != address(0), "pool doesn't exist");

        (uint160 sqrtPriceX96, , , , , , ) = IUniswapV3Pool(_pool).slot0();
        console.log("sqrtPriceX96: ", sqrtPriceX96);

        uint256 Q96 = (2 ** 96) ** 2;
        console.log("Q96: ", Q96);

        uint256 price = sqrtPriceX96 ** 2;
        console.log(price);

        // price = price*10**(IERC20(tokenIn).decimals());
        price = price * 10 ** 18; // TODO: czemu do 18? 18-6 => 12
        console.log(price);
        if (price < Q96) {
            price = Q96 / price;
        } else {
            price = price / Q96;
        }

        console.log(price);
        // TODO: jak wykminic co tu dostajemy? price dla WMATIC/USDC czy USDC/WMATIC

        return price;
    }
}
