// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/// @notice interface for Vault contract
interface IVault {

    // -----------------------------------------------------------------------
    //                              Enums
    // -----------------------------------------------------------------------

    /// @dev declares supported strategies
    enum Strategy {
        Unsupported,
        AAVE,
        Celer,
        DForce,
        InsurAce
    }

    // -----------------------------------------------------------------------
    //                              Errors
    // -----------------------------------------------------------------------

    /// @dev unsupported
    error UnsupportedStrategy();

    // -----------------------------------------------------------------------
    //                              External
    // -----------------------------------------------------------------------

    /// @dev deposits tokens using attached strategy
    function deposit(address _token, uint256 _amount) external payable;
    /// @dev withdraws tokens using attached strategy
    function withdraw(address _token, uint256 _amount) external;

}
