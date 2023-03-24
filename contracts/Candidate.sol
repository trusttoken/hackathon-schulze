// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

uint8 constant MAX_CANDIDATES = 32;

type Candidate is uint8;

library Candidates {
    function index(Candidate candidate) internal pure returns (uint8) {
        return Candidate.unwrap(candidate);
    }

    function eq(Candidate a, Candidate b) internal pure returns (bool) {
        return Candidate.unwrap(a) == Candidate.unwrap(b);
    }

    function lt(Candidate a, Candidate b) internal pure returns (bool) {
        return Candidate.unwrap(a) < Candidate.unwrap(b);
    }

    function next(Candidate candidate) internal pure returns (Candidate) {
        return Candidate.wrap(Candidate.unwrap(candidate) + 1);
    }
}
