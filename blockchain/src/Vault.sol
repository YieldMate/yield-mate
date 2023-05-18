// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// local imports
import { IVault } from "./interfaces/IVault.sol";
import { AAVE } from "./strategies/AAVE.sol";

/// @notice vault integrated with yield generating strategies
contract Vault is IVault {

    // -----------------------------------------------------------------------
    //                              Constants
    // -----------------------------------------------------------------------

    address constant internal MATIC = 0x0000000000000000000000000000000000000000;
    address constant internal wMATIC = 0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270;
    address constant internal wETH = 0x7ceb23fd6bc0add59e62ac25578270cff1b9f619;
    address constant internal wBTC = 0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6;
    address constant internal USDC = 0x2791bca1f2de4661ed88a30c99a7a9449aa84174;
    address constant internal USDT = 0xc2132d05d31c914a87c6611c10748aeb04b58e8f;
    address constant internal DAI = 0x8f3cf7ad23cd3cadbd9735aff958023239c6a063;
    address constant internal BAL = 0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3;
    address constant internal CRV = 0x172370d5cd63279efa6d502dab29171933a610af;
    address constant internal SUSHI = 0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a;
    address constant internal LINK = 0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39;

    // -----------------------------------------------------------------------
    //                              State variables
    // -----------------------------------------------------------------------

    /// @dev binds strategy to token address
    mapping (address => Strategy) public resolvers;

    // -----------------------------------------------------------------------
    //                              Constructor
    // -----------------------------------------------------------------------

    constructor() {
        /// @dev MATIC                                          APY: 1.33%
        resolvers[MATIC] = Strategy.AAVE;
        /// @dev wMATIC                                         APY: 1.33%
        resolvers[wMATIC] = Strategy.AAVE;
        /// @dev wETH                                           APY: 0.26%
        resolvers[wETH] = Strategy.AAVE;
        /// @dev wBTC                                           APY: 0.10%
        resolvers[wBTC] = Strategy.AAVE;
        /// @dev USDC                                           APY: 2.38%
        resolvers[USDC] = Strategy.AAVE;
        /// @dev USDT                                           APY: 2.19%
        resolvers[USDT] = Strategy.AAVE;
        /// @dev DAI                                            APY: 2.47%
        resolvers[DAI] = Strategy.AAVE;
        /// @dev BAL                                            APY: 8.55%
        resolvers[BAL] = Strategy.AAVE;
        /// @dev CRV                                            APY: 3.37%
        resolvers[CRV] = Strategy.AAVE;
        /// @dev SUSHI                                          APY: 2.97%
        resolvers[SUSHI] = Strategy.AAVE;
        /// @dev LINK                                           APY: 1.14%
        resolvers[LINK] = Strategy.AAVE;
    }

    // -----------------------------------------------------------------------
    //                              External
    // -----------------------------------------------------------------------

    /// @dev deposits funds via attached strategy for given asset
    function deposit(address _token, uint256 _amount) external payable {

        // shares
        uint256 shares_;

        // deposit funds from user to underlying protocol
        Strategy strategy_ = resolvers[_token];
        if (strategy_ == Strategy.AAVE) {
            if (_token == MATIC) {
                shares_ = AAVE.depositNative(_token, _amount);
            } else {
                shares_ = AAVE.deposit(_token, _amount);
            }
        } else if (strategy_ == Strategy.Unsupported) {
            revert UnsupportedStrategy();
        }

        // update storage
        // TODO

    }

    function withdraw(uint256 _shares) external {

        // update storage
        // TODO

        // send funds from underlying protocol back to the user
        // TODO

    }
}
