import { CandidateChoice } from '@/components/Vote/VoteForm'
import { Candidate } from '@/types/Candidate'

export const toBallotArgument = (
  candidateChoices: CandidateChoice[],
  candidates: Candidate[],
) => {
  const rankMap = candidateChoices.reduce(
    (map, { address, rank }) => ({ ...map, [address]: rank }),
    {} as Record<string, number>,
  )
  // User ranks 1 highest to n lowest, smart contract considers n-1 highest and 0 lowest
  const orderedRanks = candidates.map(
    ({ address }) => candidates.length - rankMap[address],
  )
  let argument = 0
  orderedRanks.forEach((rank) => {
    argument = (argument << 8) | rank
  })
  return argument
}
