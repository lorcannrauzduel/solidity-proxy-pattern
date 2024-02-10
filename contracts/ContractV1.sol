// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import './EternelStorage.sol';

contract ContractV1 {
    address implementation;
    EternelStorage private eternelStorage;
    bytes32 private constant MESSAGE_KEY = keccak256(abi.encodePacked("MESSAGE"));

    event MessageChanged(string newMessage);

    function setStorageAddress(address storageAddress) public {
        eternelStorage = EternelStorage(storageAddress);
    }

    function setMessage(string memory newMessage) public {
        eternelStorage.setString(MESSAGE_KEY, newMessage);
        emit MessageChanged(newMessage);
    }

    function getMessage() public view returns (string memory) {
        return string.concat("Message V1: ", eternelStorage.getString(MESSAGE_KEY));
    }
}