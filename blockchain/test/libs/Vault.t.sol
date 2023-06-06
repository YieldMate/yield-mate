// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "forge-std/StdUtils.sol";
import "forge-std/console.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Vault} from "../../src/libs/vault/Vault.sol";
import {Tokens} from "../../src/libs/vault/lib/Tokens.sol";

contract VaultTest is Test {
    Vault public vault;
    uint256 polygonFork;

    address alice = address(1);

    function setUp() public {
        // fork
        polygonFork = vm.createFork(
            "https://polygon-mainnet.g.alchemy.com/v2/_10Vi45eEAvUINkWLFieJI_6v4pERP39"
        );
        vm.selectFork(polygonFork);
        // vault
        vault = new Vault();
    }

    function testDeposit() public {
        // prank
        vm.startPrank(alice);

        // amount
        uint256 amount_ = 10 ** 9;

        // mint
        deal(Tokens.USDC, alice, amount_);

        // approve
        IERC20(Tokens.USDC).approve(address(vault), amount_);

        // deposit
        vault.deposit(Tokens.USDC, amount_, 1);
    }

    function testWithdraw() public {
        // deposit
        testDeposit();

        // amount
        uint256 amount_ = 10 ** 9;

        // assert
        assertEqUint(IERC20(Tokens.USDC).balanceOf(alice), 0);

        // withdraw
        vault.withdraw(Tokens.USDC, amount_);

        // assert
        assertEqUint(IERC20(Tokens.USDC).balanceOf(alice), amount_);
    }

    function testGetTokenAmount() public {
        // deposit
        testDeposit();

        // get token amount
        uint256 amount_ = vault.getTokenAmount(Tokens.USDC, 1);

        // assert
        assertGe(amount_, 10 ** 9);
    }
}
