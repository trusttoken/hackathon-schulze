// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import { Candidate, Candidates, MAX_CANDIDATES } from "./Candidate.sol";
import { Rank, Ranks } from "./Rank.sol";

type Ballot is uint256;

library Ballots {
    using Candidates for Candidate;
    using Ranks for Rank;

    function isValid(Ballot ballot, uint256 numCandidates) internal pure returns (bool) {
        assert(numCandidates <= MAX_CANDIDATES);
        uint256 extra = Ballot.unwrap(ballot) >> (8 * numCandidates);
        return extra == 0;
    }

    function exists(Ballot ballot) internal pure returns (bool) {
        return Ballot.unwrap(ballot) != 0;
    }

    function rankOf(Ballot ballot, Candidate candidate) internal pure returns (Rank) {
        assert(candidate.lt(MAX_CANDIDATES));
        uint8 rawRank = uint8(Ballot.unwrap(ballot) >> (8 * candidate.index()));
        return Ranks.from(rawRank);
    }
}
