// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

uint8 constant MAX_CANDIDATES = 32;

type Candidate is uint8;
type Rank is uint8;
type Ballot is uint256;

library BallotAccess {
    function boundsCheck(Candidate candidate) internal pure {
        assert(Candidate.unwrap(candidate) < MAX_CANDIDATES);
    }

    function rankOf(Ballot ballot, Candidate candidate) internal pure returns (Rank) {
        boundsCheck(candidate);
        return Rank.wrap(uint8(Ballot.unwrap(ballot) >> Candidate.unwrap(candidate)));
    }
}
