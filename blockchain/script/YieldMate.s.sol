// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/libs/order-manager/OrderManager.sol";
import {Quoter} from "../src/libs/order-manager/price-engine/Quoter.sol";
import {Swaper} from "../src/libs/order-manager/swaper/Swaper.sol";

contract MyScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Quoter quoter = new Quoter(
            0x1F98431c8aD98523631AE4a59f267346ea31F984,
            0xE592427A0AEce92De3Edee1F18E0157C05861564
        );

        Swaper swaper = new Swaper(
            0xE592427A0AEce92De3Edee1F18E0157C05861564,
            address(quoter)
        );

        OrderManager manager = new OrderManager(
            address(quoter),
            address(swaper)
        );

        console.log("manager: %s", address(manager));

        vm.stopBroadcast();
    }
}
