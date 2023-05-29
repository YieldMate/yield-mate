// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// OpenZeppelin imports
import { IERC20 } from "@openzeppelin/token/ERC20/IERC20.sol";

// AAVE imports
import { IPool } from "../lib/AAVE/pool/IPool.sol";
import { IWETHGateway } from "../lib/AAVE/gateway/IWETHGateway.sol";

// Local imports
import { Tokens } from "../lib/Tokens.sol";

// @notice vault integrated with yield generating strategies
abstract contract AAVE {

    // -----------------------------------------------------------------------
    //                              Structs
    // -----------------------------------------------------------------------

    struct Deposit {
        address sender;
        uint256 amount;
    }

    // -----------------------------------------------------------------------
    //                              State variables
    // -----------------------------------------------------------------------

    IPool public pool = IPool(0x794a61358D6845594F94dc1DB02A252b5b4814aD);
    IWETHGateway public gateway = IWETHGateway(0x1e4b7A6b903680eab0c5dAbcb8fD429cD2a9598c);
    mapping (address => address) public aTokens;
    mapping (address => Deposit[]) public deposits;
    mapping (address => uint256) public depositLength;
    mapping (address => uint256) public totalSupplies;

    // -----------------------------------------------------------------------
    //                              Errors
    // -----------------------------------------------------------------------

    error NotEnoughAllowance();
    error NotEnoughMsgValue();

    // -----------------------------------------------------------------------
    //                              Constructor
    // -----------------------------------------------------------------------

    constructor() {
        /// @dev MATIC
        aTokens[Tokens.MATIC] = 0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97;
        /// @dev wMATIC
        aTokens[Tokens.wMATIC] = 0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97;
        /// @dev wETH
        aTokens[Tokens.wETH] = 0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8;
        /// @dev wBTC
        aTokens[Tokens.wBTC] = 0x078f358208685046a11C85e8ad32895DED33A249;
        /// @dev USDC
        aTokens[Tokens.USDC] = 0x625E7708f30cA75bfd92586e17077590C60eb4cD;
        /// @dev USDT
        aTokens[Tokens.USDT] = 0x6ab707Aca953eDAeFBc4fD23bA73294241490620;
        /// @dev DAI
        aTokens[Tokens.DAI] = 0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE;
        /// @dev BAL
        aTokens[Tokens.BAL] = 0x8ffDf2DE812095b1D19CB146E4c004587C0A0692;
        /// @dev CRV
        aTokens[Tokens.CRV] = 0x513c7E3a9c69cA3e22550eF58AC1C0088e918FFf;
        /// @dev SUSHI
        aTokens[Tokens.SUSHI] = 0xc45A479877e1e9Dfe9FcD4056c699575a1045dAA;
        /// @dev LINK
        aTokens[Tokens.LINK] = 0x191c10Aa4AF7C30e871E70C95dB0E4eb77237530;
    }

    // -----------------------------------------------------------------------
    //                              Internal
    // -----------------------------------------------------------------------

    /// @dev deposits funds to AAVE contract
    /// @param _token address of ERC20
    /// @param _amount quantity of deposited ERC20
    function _deposit(
        address _token,
        uint256 _amount
    ) internal {
        // aToken
        address aToken_ = aTokens[_token];

        // validation
        if (IERC20(_token).allowance(msg.sender, address(this)) < _amount) {
            revert NotEnoughAllowance();
        }

        // approval
        IERC20(_token).approve(address(pool), _amount);

        // recompute deposits with yield
        _recomputeDeposits(aToken_);

        // deposit to pool
        pool.supply(_token, _amount, address(this), 0);

        // add new deposit
        _addDeposit(aToken_, _amount);
    }
    
    /// @dev deposits native token (MATIC) to AAVE contract
    /// @param _token address of ERC20
    /// @param _amount number of ERC20 to deposit
    function _depositNative(
        address _token,
        uint256 _amount
    ) internal {
        // aToken
        address aToken_ = aTokens[_token];

        // validation
        if (msg.value < _amount) {
            revert NotEnoughMsgValue();
        }

        // recompute deposits with yield
        _recomputeDeposits(aToken_);

        // AAVE integration
        gateway.depositETH{value: _amount}(address(pool), address(this), 0);

        // add new deposit
        _addDeposit(aToken_, _amount);
    }

    /// @dev withdraws funds from AAVE contract
    /// @param _token address of ERC20
    /// @param _amount portion of pool to withdrawn
    /// @return amount_ actual number of tokens with yield
    function _withdraw(address _token, uint256 _amount) internal
    returns (uint256 amount_) {
        amount_ = 0;
    }

    function _recomputeDeposits(address _aToken) internal {
        // check last supply
        uint256 last_ = totalSupplies[_aToken];

        // check current supply
        uint256 current_ = IERC20(_aToken).balanceOf(address(this));

        // recompute all deposits if yield is generated
        if (current_ > last_) {
            uint256 length_ = depositLength[_aToken];
            for (uint256 i = 0; i < length_; i++) {
                uint256 amount_ = deposits[_aToken][i].amount;
                deposits[_aToken][i].amount = amount_ * current_ / last_;
            }
        }
    }

    function _addDeposit(address _aToken, uint256 _amount) internal {
        // add member to deposit mapping
        deposits[_aToken].push(Deposit(msg.sender, _amount));
        // increase deposits length
        depositLength[_aToken] += 1;
    }

}
