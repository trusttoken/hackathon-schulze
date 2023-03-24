// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/utils/math/Math.sol";

import { Candidate, Candidates, MAX_CANDIDATES } from "./Candidate.sol";
import { Distance, Distances } from "./Distance.sol";

enum Cmp { Less, Equal, Greater }

struct Path {
    uint256[MAX_CANDIDATES][MAX_CANDIDATES] paths;
    uint8 numCandidates;
}

library Paths {
    using Candidates for Candidate;
    using Distances for Distance;

    function cmp(Path memory path, Candidate a, Candidate b) internal pure returns (Cmp) {
        uint256 pathAB = Paths.p(path, a, b);
        uint256 pathBA = Paths.p(path, b, a);
        if (pathAB > pathBA) {
            return Cmp.Greater;
        } else if (pathAB < pathBA) {
            return Cmp.Less;
        }
        return Cmp.Equal;
    }

    function p(Path memory path, Candidate a, Candidate b) internal pure returns (uint256) {
        return path.paths[a.index()][b.index()];
    }

    function calculate(Path memory path, Distance storage distance) internal view {
        path.numCandidates = distance.numCandidates;
        for (Candidate a; a.lt(path.numCandidates); a = a.next()) {
            for (Candidate b; b.lt(a.index()); b = b.next()) {
                uint256 distanceAB = distance.d(a, b);
                uint256 distanceBA = distance.d(b, a);
                if (distanceAB > distanceBA) {
                    path.paths[a.index()][b.index()] = distanceAB;
                } else if (distanceBA > distanceAB) {
                    path.paths[b.index()][a.index()] = distanceBA;
                }
            }
        }
        for (Candidate a; a.lt(path.numCandidates); a = a.next()) {
            for (Candidate b; b.lt(path.numCandidates); b = b.next()) {
                if (a.eq(b)) {
                    continue;
                }
                uint256 pathBA = Paths.p(path, b, a);
                for (Candidate c; c.lt(path.numCandidates); c = c.next()) {
                    if (a.eq(c) || b.eq(c)) {
                        continue;
                    }
                    uint256 pathAC = Paths.p(path, a, c);
                    uint256 pathBC = Paths.p(path, b, c);
                    path.paths[b.index()][c.index()] = Math.max(pathBC, Math.min(pathBA, pathAC));
                }
            }
        }
    }
}
