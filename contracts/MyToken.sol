// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Group4Token
 * @notice ERC20 token with ETH-to-token conversion and multisig minting
 * @dev Deployed by Group 4 for academic demonstration
 */
contract Group4Token is ERC20, Ownable {
    uint256 public rate = 100; // Exchange rate: 1 ETH = 100 tokens
    address[] public minters;

    // For multisig minting
    mapping(address => bool) public approvedMinters;
    mapping(bytes32 => mapping(address => bool)) public mintVotes;
    mapping(bytes32 => uint8) public voteCount;

    /**
     * @notice Constructor to initialize token and set minters
     * @param _minters Array of 3 minter addresses
     * @param initialOwner The address that will be the contract owner
     */
    constructor(address[] memory _minters, address initialOwner)
        ERC20("Group4 Token", "G4TK")
        Ownable(initialOwner)
    {
        require(_minters.length == 3, "Must provide 3 minters");
        minters = _minters;
        for (uint i = 0; i < 3; i++) {
            approvedMinters[_minters[i]] = true;
        }
    }

    /**
     * @notice Fallback function to receive ETH and mint tokens
     */
    receive() external payable {
        require(msg.value > 0, "Send ETH");
        _mint(msg.sender, msg.value * rate);
    }

    /**
     * @notice Buy tokens by calling this function and sending ETH
     */
    function buyTokens() external payable {
        require(msg.value > 0, "Send ETH");
        _mint(msg.sender, msg.value * rate);
    }

    /**
     * @notice Propose a mint by one of the approved minters
     * @param to Address to receive tokens
     * @param amount Amount of tokens to mint
     */
    function proposeMint(address to, uint256 amount) external {
        require(approvedMinters[msg.sender], "Not a minter");
        bytes32 txHash = keccak256(abi.encodePacked(to, amount));
        require(!mintVotes[txHash][msg.sender], "Already voted");

        mintVotes[txHash][msg.sender] = true;
        voteCount[txHash]++;
    }

    /**
     * @notice Execute mint after minimum 2 approvals
     * @param to Address to receive tokens
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external {
        require(approvedMinters[msg.sender], "Not a minter");
        bytes32 txHash = keccak256(abi.encodePacked(to, amount));
        require(voteCount[txHash] >= 2, "Need 2 approvals");

        _mint(to, amount);

        // Reset votes
        for (uint i = 0; i < minters.length; i++) {
            mintVotes[txHash][minters[i]] = false;
        }
        voteCount[txHash] = 0;
    }

    /**
     * @notice Owner can withdraw ETH from the contract
     * @param to Destination address
     * @param amount Amount in wei
     */
    function withdraw(address payable to, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Not enough ETH");
        to.transfer(amount);
    }
}
