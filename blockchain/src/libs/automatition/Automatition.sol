// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import {AutomationCompatible} from "@chainlink/src/v0.8/AutomationCompatible.sol";
import {IOrderManager} from "../order-manager/IOrderManager.sol";

contract Automatition is AutomationCompatible {
    // get manager interface
    IOrderManager private orderManager;

    /**
     * Use an interval in seconds and a timestamp to slow execution of Upkeep
     */
    uint public immutable interval;
    uint public lastTimeStamp;

    constructor(uint updateInterval, address _orderManager) {
        interval = updateInterval;
        lastTimeStamp = block.timestamp;
        orderManager = IOrderManager(_orderManager);
    }

    function _checkEligible() internal view returns (uint256[] memory) {
        uint256[] memory _eligbleOrders = orderManager.getEligibleOrders();
        if (_eligbleOrders.length == 0) {
            revert();
        }
        return _eligbleOrders;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        uint256[] memory _eligbleOrders = orderManager.getEligibleOrders();
        if (_eligbleOrders.length == 0) {
            upkeepNeeded = false;
            return (upkeepNeeded, "");
        }
        upkeepNeeded = true;
    }

    function performUpkeep(bytes calldata) external override {
        uint256[] memory _eligbleOrders = _checkEligible();
        orderManager.executeOrders(_eligbleOrders);
        lastTimeStamp = block.timestamp;
    }
}
