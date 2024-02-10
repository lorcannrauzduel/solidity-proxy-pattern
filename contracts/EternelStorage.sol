// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract EternelStorage {
    mapping(bytes32 => string) internal stringStorage;

    function setString(bytes32 key, string memory value) external {
        stringStorage[key] = value;
    }

    function getString(bytes32 key) external view returns (string memory) {
        return stringStorage[key];
    }
}