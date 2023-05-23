// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;
import "forge-std/Test.sol";
import "forge-std/StdUtils.sol";

import "../../src/libs/order-manager/OrderManager.sol";
import "../../src/libs/price-engine/Quoter.sol";

import {OrderInfo, OrderStatus, OrderType} from "../../src/libs/order-manager/lib/Objects.sol";

contract OrderManagerTest is Test {
    OrderManager public manager;
    Quoter public quoter;

    uint256 polygonFork;

    address WMATIC = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;
    address USDC = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address USDT = 0xc2132D05D31c914a87C6611C10748AEb04B58e8F;
    address WBTC = 0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6;
    address AVAX = 0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b;
    address LINK = 0xb0897686c545045aFc77CF20eC7A532E3120E0F1;
    address UNI = 0xb33EaAd8d922B1083446DC23f610c2567fB5180f;
    address GRT = 0x5fe2B58c013d7601147DcdD68C143A77499f5531;

    function setUp() public {
        polygonFork = vm.createFork(
            "https://polygon-mainnet.g.alchemy.com/v2/_10Vi45eEAvUINkWLFieJI_6v4pERP39"
        );
        vm.selectFork(polygonFork);

        quoter = new Quoter(
            0x1F98431c8aD98523631AE4a59f267346ea31F984,
            0xE592427A0AEce92De3Edee1F18E0157C05861564
        );
        manager = new OrderManager(address(quoter));
    }

    function _addOrder(
        address _sender,
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _price,
        OrderType _type
    ) internal {
        deal(_tokenIn, _sender, _amountIn + 10000);

        console.log("msg.sender:", _sender);

        vm.startPrank(_sender);
        address(_tokenIn).call(
            abi.encodeWithSignature(
                "approve(address,uint256)",
                address(manager),
                _amountIn
            )
        );

        (bool result, bytes memory data) = address(_tokenIn).call(
            abi.encodeWithSignature("balanceOf(address)", _sender)
        );

        console.log(abi.decode(data, (uint256)), _amountIn);
        manager.addOrder(_tokenIn, _tokenOut, _amountIn, _price, _type);
        vm.stopPrank();
    }

    function testAddOrder() public {
        _addOrder(
            address(123),
            USDC,
            WMATIC,
            10 * 10 ** 6,
            900000,
            OrderType.BUY
        );

        _addOrder(
            address(124),
            USDT,
            WBTC,
            10 * 10 ** 6,
            26000 * 10 ** 6,
            OrderType.BUY
        );

        // _addOrder(
        //     address(125),
        //     AVAX,
        //     LINK,
        //     4 * 10 ** 18,
        //     10 * 10 ** 18,
        //     OrderType.BUY
        // );
    }
}
