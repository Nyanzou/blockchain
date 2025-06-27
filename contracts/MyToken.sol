// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Group1Token is ERC20, Ownable {
    uint256 public rate = 100;
    address[] public minters;
    mapping(address => bool) public approvedMinters;
    mapping(bytes32 => bool) public mintVotes;

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

    receive() external payable {
        require(msg.value > 0, "Send ETH");
        _mint(msg.sender, msg.value * rate);
    }

    function buyTokens() external payable {
        require(msg.value > 0, "Send ETH");
        _mint(msg.sender, msg.value * rate);
    }

    function proposeMint(address to, uint256 amount) external {
        require(approvedMinters[msg.sender], "Not allowed");
        bytes32 txHash = keccak256(abi.encodePacked(to, amount));
        mintVotes[txHash] = true;
    }

    function mint(address to, uint256 amount) external {
        require(approvedMinters[msg.sender], "Not allowed");
        bytes32 txHash = keccak256(abi.encodePacked(to, amount));
        require(mintVotes[txHash], "Mint not approved");
        _mint(to, amount);
        mintVotes[txHash] = false;
    }

    function withdraw(address payable to, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        to.transfer(amount);
    }
}
