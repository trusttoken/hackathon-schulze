// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

import { Ballot } from "./Ballot.sol";

enum State { Register, Vote, Tally }

contract SchulzeMethodElection is AccessControlEnumerable {
    bytes32 public constant CANDIDATE_ROLE = keccak256("CANDIDATE_ROLE");
    bytes32 public constant VOTER_ROLE = keccak256("VOTER_ROLE");

    event RegistrationClosed();
    event Voted(address, Ballot);
    event VotingClosed();

    error InvalidState(State actualState, State expectedState);

    modifier onlyState(State _expectedState) {
        if (state != _expectedState) revert InvalidState(state, _expectedState);
        _;
    }

    State public state;
    mapping(address => Ballot) public ballotOf;

    constructor () {
        state = State.Register;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // State.Register

    function _grantRole(bytes32 role, address account) internal override onlyState(State.Register) {
        super._grantRole(role, account);
    }

    function _revokeRole(bytes32 role, address account) internal override onlyState(State.Register) {
        super._revokeRole(role, account);
    }

    function closeRegistration() external onlyState(State.Register) onlyRole(DEFAULT_ADMIN_ROLE) {
        state = State.Vote;
        emit RegistrationClosed();
    }

    // State.Vote

    function vote(Ballot ballot) external onlyState(State.Vote) onlyRole(VOTER_ROLE) {
        ballotOf[msg.sender] = ballot;
        emit Voted(msg.sender, ballot);
    }

    function closeVoting() external onlyState(State.Vote) onlyRole(DEFAULT_ADMIN_ROLE) {
        state = State.Tally;
        emit VotingClosed();
    }

    // State.Tally

    function rankCandidates() external view returns (address[] memory) {
        address[] memory candidates;
        return candidates;
    }
}
