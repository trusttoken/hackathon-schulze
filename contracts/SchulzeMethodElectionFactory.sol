// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {SchulzeMethodElection} from "./SchulzeMethodElection.sol";

contract SchulzeMethodElectionFactory {
    event ElectionCreated(SchulzeMethodElection);

    function create() external {
        SchulzeMethodElection schulze = new SchulzeMethodElection();
        schulze.grantRole(schulze.DEFAULT_ADMIN_ROLE(), msg.sender);
        schulze.renounceRole(schulze.DEFAULT_ADMIN_ROLE(), address(this));
        emit ElectionCreated(schulze);
    }
}
