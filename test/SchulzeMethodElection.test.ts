import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SchulzeMethodElection", function () {
  const VOTERS = [
    ["ACBED", 5],
    ["ADECB", 5],
    ["BEDAC", 8],
    ["CABED", 3],
    ["CAEBD", 7],
    ["CBADE", 2],
    ["DCEBA", 7],
    ["EBADC", 8]
  ]

  function constructBallot(ballotString) {
    let ballot = ethers.constants.Zero;
    for (let i in ballotString) {
      const rank = 4 - i;
      const candidate = ballotString.codePointAt(i) - 65;
      ballot = ballot.add(rank << (8 * candidate));
      console.log("ballotString: " + ballotString + " rank: " + rank + " candidate: " + candidate + " ballot: " + ballot);
    }
    return ballot;
  }

  async function schulzeMethodFixture() {
    const [owner, a, b, c, d, e] = await ethers.getSigners();

    const SchulzeMethodElection = await ethers.getContractFactory("SchulzeMethodElection");
    const schulze = await SchulzeMethodElection.deploy();

    const CANDIDATE_ROLE = await schulze.CANDIDATE_ROLE();
    schulze.grantRole(CANDIDATE_ROLE, a.address);
    schulze.grantRole(CANDIDATE_ROLE, b.address);
    schulze.grantRole(CANDIDATE_ROLE, c.address);
    schulze.grantRole(CANDIDATE_ROLE, d.address);
    schulze.grantRole(CANDIDATE_ROLE, e.address);

    const VOTER_ROLE = await schulze.VOTER_ROLE();
    let voters = [];
    for (let [ballotString, count] of VOTERS) {
      const ballot = constructBallot(ballotString);
      for (let _ in Array(count)) {
        const voter = ethers.Wallet.createRandom();
        schulze.grantRole(VOTER_ROLE, voter.address);
        voters.push([voter, ballot]);
      }
    }

    return { owner, schulze, a, b, c, d, e, voters };
  }

  it("works", async function () {
    const { schulze, a, b, c, d, e, voters } = await loadFixture(schulzeMethodFixture);

    schulze.closeRegistration();
    console.log("Closed registration");

    for (let entry in voters) {
      const voter = entry[0];
      const ballot = entry[1];
      await schulze.connect(voter).vote(ballot);
    }

    await schulze.closeVoting();
    console.log("Closed voting");

    expect(await schulze.rankCandidates()).to.equal([e.address, a.address, c.address, b.address, d.address]);
  });
});
