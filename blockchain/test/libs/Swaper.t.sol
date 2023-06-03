// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;
import "forge-std/Test.sol";
import "forge-std/StdUtils.sol";
import "forge-std/console.sol";

import "../../src/libs/order-manager/swaper/Swaper.sol";
import "../../src/libs/order-manager/price-engine/Quoter.sol";

contract OrderManagerTest is Test {
    Swaper public swaper;
    Quoter public quoter;
    uint256 polygonFork;

    address alice = address(123);

    function setUp() public {
        polygonFork = vm.createFork(
            "https://polygon-mainnet.g.alchemy.com/v2/_10Vi45eEAvUINkWLFieJI_6v4pERP39"
        );
        vm.selectFork(polygonFork);

        quoter = new Quoter(
            0x1F98431c8aD98523631AE4a59f267346ea31F984,
            0xE592427A0AEce92De3Edee1F18E0157C05861564
        );

        swaper = new Swaper(
            0xE592427A0AEce92De3Edee1F18E0157C05861564,
            address(quoter),
            msg.sender
        );
    }

    function testSwapExactInputSingle() public {
        address WMATIC = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;
        address USDC = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
        uint256 _amountIn = 8000000;

        deal(USDC, alice, _amountIn);

        vm.startPrank(alice);

        address(USDC).call(
            abi.encodeWithSignature(
                "transfer(address,uint256)",
                address(swaper),
                _amountIn
            )
        );

        swaper.swapExactInputSingle(
            USDC, // dajemy matic
            WMATIC, // za usdc
            _amountIn,
            0,
            0,
            alice
        );

        address[] memory _users = new address[](1);
        _users[0] = alice;

        console.log(
            "alice WMATIC balance",
            StdUtils.getTokenBalances(WMATIC, _users)[0]
        );
    }
}
