import { useCandidates } from '@/hooks/useCandidates'
import { useShuffledCandidates } from '@/hooks/useShuffledCandidates'
import { Heading } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { VoteForm } from './VoteForm'

interface Props {
  electionAddress: string
}

export function Vote({ electionAddress }: Props) {
  const { account } = useEthers()
  const candidates = useCandidates(electionAddress)
  const shuffledCandidates = useShuffledCandidates(candidates)

  // TODO only display this if you have the role of a voter

  if (!candidates || !shuffledCandidates) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Heading size="sm">Voting as {account}</Heading>
      <VoteForm
        electionAddress={electionAddress}
        candidates={candidates}
        shuffledCandidates={shuffledCandidates}
      />
    </>
  )
}
