// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// Local imports
import { IVault } from "./interfaces/IVault.sol";
import { AAVE } from "./strategies/AAVE.sol";
import { Tokens } from "./lib/Tokens.sol";

/// @notice vault integrated with yield generating strategies
contract Vault is IVault, AAVE {
    // -----------------------------------------------------------------------
    //                              State variables
    // -----------------------------------------------------------------------

    /// @dev binds strategy to token address
    mapping (address => Strategy) public resolvers;


    // -----------------------------------------------------------------------
    //                              Constructor
    // -----------------------------------------------------------------------

    constructor() AAVE() {
        /// @dev MATIC                                          APY: 1.33%
        resolvers[Tokens.MATIC] = Strategy.AAVE;
        /// @dev wMATIC                                         APY: 1.33%
        resolvers[Tokens.wMATIC] = Strategy.AAVE;
        /// @dev wETH                                           APY: 0.26%
        resolvers[Tokens.wETH] = Strategy.AAVE;
        /// @dev wBTC                                           APY: 0.10%
        resolvers[Tokens.wBTC] = Strategy.AAVE;
        /// @dev USDC                                           APY: 2.38%
        resolvers[Tokens.USDC] = Strategy.AAVE;
        /// @dev USDT                                           APY: 2.19%
        resolvers[Tokens.USDT] = Strategy.AAVE;
        /// @dev DAI                                            APY: 2.47%
        resolvers[Tokens.DAI] = Strategy.AAVE;
        /// @dev BAL                                            APY: 8.55%
        resolvers[Tokens.BAL] = Strategy.AAVE;
        /// @dev CRV                                            APY: 3.37%
        resolvers[Tokens.CRV] = Strategy.AAVE;
        /// @dev SUSHI                                          APY: 2.97%
        resolvers[Tokens.SUSHI] = Strategy.AAVE;
        /// @dev LINK                                           APY: 1.14%
        resolvers[Tokens.LINK] = Strategy.AAVE;
    }

    // -----------------------------------------------------------------------
    //                              External
    // -----------------------------------------------------------------------

    /// @dev deposits funds via attached strategy for given asset
    function deposit(
        address _token,
        uint256 _amount,
        uint256 _orderId
    ) external payable {
        // deposit funds from user to underlying protocol
        Strategy strategy_ = resolvers[_token];
        if (strategy_ == Strategy.AAVE) {
            if (_token == Tokens.MATIC) {
                _depositNative(_token, _amount, _orderId);
            } else {
                _deposit(_token, _amount, _orderId);
            }
        } else if (strategy_ == Strategy.Unsupported) {
            revert UnsupportedStrategy();
        }
    }

    function withdraw(
        address _token,
        uint256 _orderId
    ) external {
        // update storage
        // TODO

        // send funds from underlying protocol back to the user
        Strategy strategy_ = resolvers[_token];
        if (strategy_ == Strategy.AAVE) {
            _withdraw(_token, _orderId);
        } else if (strategy_ == Strategy.Unsupported) {
            revert UnsupportedStrategy();
        }
    }
}
