// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IERC20 } from "@openzeppelin/token/ERC20/IERC20.sol";

// @notice vault integrated with yield generating strategies
library AAVE {

    // -----------------------------------------------------------------------
    //                              Errors
    // -----------------------------------------------------------------------

    error NotEnoughAllowance();
    error NotEnoughMsgValue();

    // -----------------------------------------------------------------------
    //                              Internal
    // -----------------------------------------------------------------------

    /// @dev deposits funds to AAVE contract
    /// @param _token address of ERC20
    /// @param _amount quantity of deposited ERC20
    /// @return shares_ portion of pool
    function deposit(address _token, uint256 _amount) internal
    returns (uint256 shares_) {

        // validation
        if (IERC20(_token).allowance(msg.sender, address(this)) < _amount) {
            revert NotEnoughAllowance();
        }

        // AAVE integration
        // (0x794a61358D6845594F94dc1DB02A252b5b4814aD).supply();

        // share computation
        shares_ = 0;

    }

    /// @dev deposits native token (MATIC) to AAVE contract
    /// @param _token address of ERC20
    /// @return shares_ portion of pool
    function depositNative(address _token, uint256 _amount) internal payable
    returns (uint256 shares_) {

        // validation
        if (msg.value < _amount) {
            revert NotEnoughMsgValue();
        }

        // AAVE integration
        // (0x1e4b7a6b903680eab0c5dabcb8fd429cd2a9598c).depositETH();

        // share computation
        shares_ = 0;

    }

    /// @dev withdraws funds from AAVE contract
    /// @param _token address of ERC20
    /// @param shares_ portion of pool to withdrawn
    /// @return _amount actual number of tokens with yield
    function withdraw(address _token, uint256 _shares) internal
    returns (uint256 tokens_) {
        tokens_ = 0;
    }
}
