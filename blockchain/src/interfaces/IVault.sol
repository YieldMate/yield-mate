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
    function deposit(address _token, uint256 _amount) external;
    /// @dev withdraws tokens using attached strategy
    function withdraw(uint256 _shares) external;

}
