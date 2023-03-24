// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

type Rank is uint8;

library Ranks {
    function from(uint8 raw) internal pure returns (Rank) {
        return Rank.wrap(raw);
    }
    function gt(Rank a, Rank b) internal pure returns (bool) {
        return Rank.unwrap(a) > Rank.unwrap(b);
    }
}
