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
    address bob = address(2);

    function setUp() public {
        // fork
        polygonFork = vm.createFork(
            "https://polygon-mainnet.g.alchemy.com/v2/_10Vi45eEAvUINkWLFieJI_6v4pERP39"
        );
        vm.selectFork(polygonFork);
        // vault
        vault = new Vault();
    }

    function _deposit(
        address _account,
        uint256 _orderId,
        uint256 _ammout
    ) internal {
        // prank
        vm.startPrank(_account);

        // mint
        deal(Tokens.USDC, _account, _ammout);

        // approve
        IERC20(Tokens.USDC).approve(address(vault), _ammout);

        // deposit
        vault.deposit(Tokens.USDC, _ammout, _orderId);
    }

    function testDeposit() public {
        // amount
        uint256 amount_ = 10 ** 9;

        _deposit(alice, 1, amount_);
    }

    function testWithdraw() public {
        // deposit
        testDeposit();

        // amount
        uint256 amount_ = 10 ** 9;

        // assert
        assertEqUint(IERC20(Tokens.USDC).balanceOf(alice), 0);

        // withdraw
        vault.withdraw(Tokens.USDC, 1);

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

    function testGetTokenAmountAfterWithdraw() public {
        // amount
        uint256 amount_ = 10 ** 9;

        // deposit 1
        _deposit(alice, 1, amount_);

        // deposit 2
        _deposit(bob, 2, amount_);

        // withdraw bob order
        vault.withdraw(Tokens.USDC, 2);

        // get token amount
        uint256 amountWithYield_ = vault.getTokenAmount(Tokens.USDC, 1);

        // assert
        assertEqUint(amountWithYield_, amount_);
    }
}
