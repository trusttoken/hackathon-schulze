// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

import {SchulzeMethodElection} from "./SchulzeMethodElection.sol";

contract SchulzeMethodElectionFactory {
    address constant BACKEND_ADDRESS = 0xED5337DBa349C6fdAAb3d014c13561c0D313Ce26; // hardcoded for hackathon

    event ElectionCreated(SchulzeMethodElection);

    address immutable impl;

    constructor() {
        impl = address(new SchulzeMethodElection());
    }

    function create() external {
        SchulzeMethodElection schulze = SchulzeMethodElection(Clones.clone(impl));
        schulze.initialize();

        schulze.grantRole(schulze.DEFAULT_ADMIN_ROLE(), msg.sender);
        schulze.grantRole(schulze.DEFAULT_ADMIN_ROLE(), BACKEND_ADDRESS);
        schulze.renounceRole(schulze.DEFAULT_ADMIN_ROLE(), address(this));

        emit ElectionCreated(schulze);
    }
}
