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

    function calculate(Sort storage sort, Path storage path) internal {
        for (Candidate a; a.lt(path.numCandidates); a.next()) {
            sort.sorts.push(a);
            uint256 aIndex;
            for (uint256 bIndex = sort.sorts.length - 1; bIndex >= 0; bIndex--) {
                Candidate b = sort.sorts[bIndex];
                if (path.cmp(a, b) == Cmp.Greater) {
                    sort.sorts[aIndex] = b;
                    sort.sorts[bIndex] = a;
                    aIndex = bIndex;
                }
            }
        }
    }
}
