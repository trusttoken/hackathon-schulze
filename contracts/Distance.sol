// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import { Ballot, Ballots } from "./Ballot.sol";
import { Candidate, Candidates, MAX_CANDIDATES } from "./Candidate.sol";
import { Rank, Ranks } from "./Rank.sol";

struct Distance {
    uint256[MAX_CANDIDATES][MAX_CANDIDATES] distances;
    uint8 numCandidates;
}

library Distances {
    using Ballots for Ballot;
    using Candidates for Candidate;
    using Ranks for Rank;

    function d(Distance storage distance, Candidate a, Candidate b) internal view returns (uint256) {
        return distance.distances[a.index()][b.index()];
    }

    function setNumCandidates(Distance storage distance, uint8 _numCandidates) internal {
        assert(_numCandidates <= MAX_CANDIDATES);
        distance.numCandidates = _numCandidates;
    }

    function addBallot(Distance storage distance, Ballot ballot) internal {
        for (Candidate a; a.lt(distance.numCandidates); a = a.next()) {
            for (Candidate b; b.lt(a.index()); b = b.next()) {
                Rank aRank = ballot.rankOf(a);
                Rank bRank = ballot.rankOf(b);
                if (aRank.gt(bRank)) {
                    distance.distances[a.index()][b.index()] += 1;
                } else if (bRank.gt(aRank)) {
                    distance.distances[b.index()][a.index()] += 1;
                }
            }
        }
    }

    function removeBallot(Distance storage distance, Ballot ballot) internal {
        for (Candidate a; a.lt(distance.numCandidates); a = a.next()) {
            for (Candidate b; b.lt(a.index()); b = b.next()) {
                Rank aRank = ballot.rankOf(a);
                Rank bRank = ballot.rankOf(b);
                if (aRank.gt(bRank)) {
                    distance.distances[a.index()][b.index()] -= 1;
                } else if (bRank.gt(aRank)) {
                    distance.distances[b.index()][a.index()] -= 1;
                }
            }
        }
    }
}
