// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract UBaEducationCredentialsStore {
    address public admin;

    struct Credential {
        string studentName;
        string program;
        string level;
        uint256 year;
        bool verified;
    }

    mapping(bytes32 => Credential) public credentials;

    constructor() {
        admin = msg.sender;
    }

    function addCredential(
        string memory studentName,
        string memory program,
        string memory level,
        uint256 year
    ) public {
        require(msg.sender == admin, "Only admin can add credentials");
        bytes32 id = keccak256(abi.encodePacked(studentName, program, level, year));
        credentials[id] = Credential(studentName, program, level, year, true);
    }

    function verifyCredential(
        string memory studentName,
        string memory program,
        string memory level,
        uint256 year
    ) public view returns (bool) {
        bytes32 id = keccak256(abi.encodePacked(studentName, program, level, year));
        return credentials[id].verified;
    }
}
