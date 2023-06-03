// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;
import "forge-std/Test.sol";
import "forge-std/StdUtils.sol";
import "forge-std/console.sol";

import "../../src/libs/order-manager/price-engine/Quoter.sol";

contract OrderManagerTest is Test {
    Quoter public quoter;
    uint256 polygonFork;

    address alice = address(1);

    function setUp() public {
        polygonFork = vm.createFork(
            "https://polygon-mainnet.g.alchemy.com/v2/_10Vi45eEAvUINkWLFieJI_6v4pERP39"
        );
        vm.selectFork(polygonFork);

        quoter = new Quoter(
            0x1F98431c8aD98523631AE4a59f267346ea31F984,
            0xE592427A0AEce92De3Edee1F18E0157C05861564
        );
    }

    function testquoteExactOutput() public {
        vm.startPrank(alice);

        address WMATIC = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;
        address USDC = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;

        uint256 value;

        // value = quoter.getQuote(
        //     WMATIC, // dajemy matic
        //     USDC, // za usdc
        //     1 * 10 ** 18 // 1 matica
        // );

        // value = quoter.getQuote(
        //     USDC, // dajemy matic
        //     WMATIC, // za usdc
        //     1 * 10 ** 6 // 1 matica
        // );

        value = quoter.getQuote(
            0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619, // dajemy weth
            0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6, // za btc
            1 * 10 ** 18 // 1 matica
        );

        // dostaniemy
        console.log(value);
    }
}
