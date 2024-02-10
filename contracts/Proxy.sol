// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import './EternelStorage.sol';

contract Proxy {
    address implementation;
    EternelStorage private eternelStorage;
    bytes32 private constant MESSAGE_KEY = keccak256(abi.encodePacked("MESSAGE"));

    error NoImplementation();

    function setImplementation(address newImplementation) public {
        implementation = newImplementation;
    }

    function setStorageAddress(address storageAddress) public {
        eternelStorage = EternelStorage(storageAddress);
    }

    function _call(address _implem) internal {
        if (_implem == address(0)) {
            revert NoImplementation();
        }

        assembly {
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), _implem, 0, calldatasize(), 0, 0)

            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }

    fallback() external payable {
        _call(implementation);
    }
}