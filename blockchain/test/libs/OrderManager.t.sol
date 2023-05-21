// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/StdUtils.sol";

import "../../src/libs/order-manager/OrderManager.sol";
import "../../src/libs/price-engine/PriceEngine.sol";
import "../../src/mocks/MockToken.sol";

import {OrderInfo, OrderStatus, OrderType} from "../../src/libs/order-manager/lib/Objects.sol";

contract OrderManagerTest is Test {
    OrderManager public manager;
    MockToken public mockToken;
    PriceEngine public engine;

    address alice = address(1);

    function setUp() public {
        engine = new PriceEngine();
        manager = new OrderManager(address(engine));
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

        address WMATIC = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;
        address USDC = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;

        // 1 MATIC = 872719 (0.87$)
        uint256 orderId = manager.addOrder(
            USDC,
            9000000,
            10 * 10 ** 6,
            WMATIC,
            OrderType.BUY
        );

        assertEq(orderId, 0);
    }
}
