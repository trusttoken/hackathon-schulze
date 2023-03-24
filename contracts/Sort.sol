// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/utils/math/Math.sol";

import { Candidate, Candidates } from "./Candidate.sol";
import { Cmp, Path, Paths } from "./Path.sol";

struct Sort {
    Candidate[] sorts;
}

library Sorts {
    using Candidates for Candidate;
    using Paths for Path;

    function at(Sort storage sort, uint256 i) internal view returns (Candidate) {
        return sort.sorts[i];
    }

    function length(Sort storage sort) internal view returns (uint256) {
        return sort.sorts.length;
    }

    function calculate(Sort storage sort, Path storage path) internal {
        for (Candidate a; a.lt(path.numCandidates); a = a.next()) {
            sort.sorts.push(a);
            for (uint256 i = sort.sorts.length - 1; i > 0; i--) {
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
