// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/StdUtils.sol";

import "../src/OrderManager.sol";
import "../src/mock/MockToken.sol";

contract YieldMateTest is Test {
    OrderManager public manager;
    MockToken public mockToken;

    address alice = address(1);

    function setUp() public {
        manager = new OrderManager();
        mockToken = new MockToken();

        deal(address(mockToken), alice, 1 ether);
    }

    function testAddOrder() public {
        vm.startPrank(alice);
        address(mockToken).call(
            abi.encodeWithSignature(
                "approve(address,uint256)",
                address(manager),
                1 ether
            )
        );
        uint256 orderId = manager.addOrder(address(mockToken), 1 ether, 10000);
        assertEq(orderId, 0);
    }
}
