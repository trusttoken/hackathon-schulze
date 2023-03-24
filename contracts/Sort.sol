// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/utils/math/Math.sol";

import { Candidate, Candidates, MAX_CANDIDATES } from "./Candidate.sol";
import { Cmp, Path, Paths } from "./Path.sol";

struct Sort {
    Candidate[MAX_CANDIDATES] sorts;
}

library Sorts {
    using Candidates for Candidate;
    using Paths for Path;

    function at(Sort memory sort, uint256 i) internal pure returns (Candidate) {
        return sort.sorts[i];
    }

    function calculate(Sort memory sort, Path memory path) internal pure {
        for (Candidate a; a.lt(path.numCandidates); a = a.next()) {
            sort.sorts[a.index()] = a;
            for (uint256 i = a.index(); i > 0; i--) {
                Candidate b = sort.sorts[i-1];
                if (path.cmp(a, b) != Cmp.Greater) {
                    break;
                }
                sort.sorts[i] = b;
                sort.sorts[i-1] = a;
            }
        }
    }
}
