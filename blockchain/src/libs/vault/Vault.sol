// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// OpenZeppelin imports
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Local imports
import {IVault} from "./IVault.sol";
import {AAVE} from "./strategies/AAVE.sol";
import {Tokens} from "./lib/Tokens.sol";

import "forge-std/console.sol";

/// @notice vault integrated with yield generating strategies
contract Vault is IVault, AAVE {
    // -----------------------------------------------------------------------
    //                              State variables
    // -----------------------------------------------------------------------

    /// @dev binds strategy to token address
    mapping(address => Strategy) public resolvers;

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
    /// @param _token asset used to deposit, see src/libs/vault/lib/Tokens.sol
    /// @param _amount number of tokens for deposit
    /// @param _orderId order manager number
    function deposit(
        address _token,
        uint256 _amount,
        uint256 _orderId
    ) external payable {
        // deposit funds from user to underlying protocol
        Strategy strategy_ = resolvers[_token];
        if (strategy_ == Strategy.AAVE) {
            if (_token == Tokens.MATIC) {
                revert UnsupportedToken();
            } else {
                _deposit(_token, _amount, _orderId);
            }
        } else if (strategy_ == Strategy.Unsupported) {
            revert UnsupportedStrategy();
        }
    }

    /// @dev withdraw funds from strategy
    /// @param _token asset used to withdraw, see src/libs/vault/lib/Tokens.sol
    /// @param _orderId order manager number
    function withdraw(
        address _token,
        uint256 _orderId
    ) external returns (uint256 amount_) {
        Strategy strategy_ = resolvers[_token];
        if (strategy_ == Strategy.AAVE) {
            if (_token == Tokens.MATIC) {
                revert UnsupportedToken();
            } else {
                amount_ = _withdraw(_token, _orderId);
            }
        } else if (strategy_ == Strategy.Unsupported) {
            revert UnsupportedStrategy();
        }
    }

    function getTokenAmount(
        address _token,
        uint256 _orderId
    ) external view returns (uint256) {
        // aToken
        address aToken_ = aTokens[_token];
        // current
        uint256 currentTotal_ = IERC20(aToken_).balanceOf(address(this));
        // last
        uint256 lastTotal_ = totalSupplies[aToken_];
        // index
        uint256 orderIndex_ = orderToDeposit[_orderId];
        // user
        Deposit memory userDeposit_ = deposits[aToken_][orderIndex_];
        // current * user / last
        uint256 amountWithYield_ = (currentTotal_ * userDeposit_.amount) / lastTotal_;
        return amountWithYield_;
    }
}
