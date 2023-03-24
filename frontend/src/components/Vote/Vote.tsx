import { useBallot } from '@/hooks/useBallot'
import { useCandidates } from '@/hooks/useCandidates'
import { useShuffledCandidates } from '@/hooks/useShuffledCandidates'
import { Alert, AlertIcon, Heading } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { VoteForm } from './VoteForm'

interface Props {
  electionAddress: string
}

export function Vote({ electionAddress }: Props) {
  const { account } = useEthers()
  const candidates = useCandidates(electionAddress)
  const shuffledCandidates = useShuffledCandidates(candidates)
  const ballot = useBallot(account, electionAddress)

  console.log({ ballot })

  // TODO only display this if you have the role of a voter

  if (!candidates || !shuffledCandidates) {
    return <p>Loading...</p>
  }

  return (
    <>
      {!!ballot && (
        <Alert status="success">
          <AlertIcon />
          You have successfully voted. If you vote again, it will update your
          preference.
        </Alert>
      )}
      <Heading size="sm">Voting as {account}</Heading>
      <VoteForm
        electionAddress={electionAddress}
        candidates={candidates}
        shuffledCandidates={shuffledCandidates}
      />
    </>
  )
}
