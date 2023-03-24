// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {SchulzeMethodElection} from "./SchulzeMethodElection.sol";

contract SchulzeMethodElectionFactory {
    constant BACKEND_ADDRESS = '0xED5337DBa349C6fdAAb3d014c13561c0D313Ce26'; // hardcoded for hackathon
    event ElectionCreated(SchulzeMethodElection);

    function create() external {
        SchulzeMethodElection schulze = new SchulzeMethodElection();
        schulze.grantRole(schulze.DEFAULT_ADMIN_ROLE(), msg.sender);
        schulze.grantRole(schulze.DEFAULT_ADMIN_ROLE(), BACKEND_ADDRESS);
        schulze.renounceRole(schulze.DEFAULT_ADMIN_ROLE(), address(this));
        emit ElectionCreated(schulze);
    }
}
