// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/libs/order-manager/OrderManager.sol";
import {Quoter} from "../src/libs/order-manager/price-engine/Quoter.sol";
import {Swaper} from "../src/libs/order-manager/swaper/Swaper.sol";
import {Automation} from "../src/libs/automation/Automation.sol";
import {Modules} from "../src/libs/order-manager/lib/Objects.sol";
import {Vault} from "../src/libs/vault/Vault.sol";

contract MyScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_PROD");
        vm.startBroadcast(deployerPrivateKey);

        Vault vault = new Vault();

        OrderManager manager = new OrderManager();

        Automation automation = new Automation(1, address(manager));

        Quoter quoter = new Quoter(
            0x1F98431c8aD98523631AE4a59f267346ea31F984,
            0xE592427A0AEce92De3Edee1F18E0157C05861564
        );

        Swaper swaper = new Swaper(
            0xE592427A0AEce92De3Edee1F18E0157C05861564,
            address(manager)
        );

        manager.setUpModule(Modules.SWAPER, address(swaper));
        manager.setUpModule(Modules.QUOTER, address(quoter));
        manager.setUpModule(Modules.VAULT, address(vault));
        manager.setUpModule(Modules.KEEPER, address(automation));

        console.log("manager: %s", address(manager));

        vm.stopBroadcast();
    }
}
