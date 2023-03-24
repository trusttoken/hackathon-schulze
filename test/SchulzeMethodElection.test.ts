import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("SchulzeMethodElection", function () {
  // https://en.wikipedia.org/wiki/Schulze_method#Example
  const VOTERS = [
    ["ACBED", 5],
    ["ADECB", 5],
    ["BEDAC", 8],
    ["CABED", 3],
    ["CAEBD", 7],
    ["CBADE", 2],
    ["DCEBA", 7],
    ["EBADC", 8]
  ];
  const EXPECTED = "EACBD";

  function constructBallot(ballotString) {
    let ballot = ethers.constants.Zero;
    const candidates = getCandidates(ballotString);
    for (let i in ballotString) {
      const rank = BigNumber.from(4 - i);
      ballot = ballot.add(rank.shl(8 * candidates[i]));
    }
    return ballot;
  }

  function getCandidates(ballotString) {
    let result = []
    for (let i in ballotString) {
      result.push(ballotString.codePointAt(i) - 65);
    }
    return result;
  }

  function permuteRanks(ballotString, candidateAddresses) {
    const candidates = getCandidates(ballotString);
    return candidates.map((candidate) => candidateAddresses[candidate].address)
  }

  function constructVoter(owner) {
    const voter = ethers.Wallet.createRandom().connect(ethers.provider);
    owner.sendTransaction({to: voter.address, value: ethers.utils.parseEther("1")});
    return voter;
  }

  async function schulzeMethodFixture() {
    const [owner, a, b, c, d, e] = await ethers.getSigners();

    const SchulzeMethodElectionFactory = await ethers.getContractFactory("SchulzeMethodElectionFactory");
    const schulzeFactory = await SchulzeMethodElectionFactory.deploy();

    const SchulzeMethodElection = await ethers.getContractFactory("SchulzeMethodElection");
    const tx = await schulzeFactory.create();
    const schulzeAddress = (await tx.wait()).events[5].args[0];
    const schulze = await SchulzeMethodElection.attach(schulzeAddress);

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
      for (let _ in [...Array(count)]) {
        const voter = constructVoter(owner);
        schulze.grantRole(VOTER_ROLE, voter.address);
        voters.push([voter, ballot]);
      }
    }

    const expected = permuteRanks(EXPECTED, [a, b, c, d, e]);

    return { owner, schulze, voters, expected };
  }

  it("works", async function () {
    const { schulze, voters, expected } = await loadFixture(schulzeMethodFixture);

    schulze.closeRegistration();

    for (let [voter, ballot] of voters) {
      await schulze.connect(voter).vote(ballot);
    }

    await schulze.closeVoting();

    expect(await schulze.rankCandidates()).to.deep.equal(expected);
  });
});
