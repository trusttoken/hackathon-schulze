import { useBallot } from '@/hooks/useBallot'
import { useCandidates } from '@/hooks/useCandidates'
import { useShuffledCandidates } from '@/hooks/useShuffledCandidates'
import { Alert, AlertIcon, Heading, Stack } from '@chakra-ui/react'
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
  // const registered = useRegistrationStatus(account, electionAddress)

  if (!candidates || !shuffledCandidates) {
    return <p>Loading...</p>
  }

  return (
    <Stack spacing={5}>
      <Heading>Cast Your Ballot</Heading>
      {!!ballot && (
        <Alert status="success">
          <AlertIcon />
          You have successfully voted. If you vote again, it will update your
          preference.
        </Alert>
      )}
      <Alert status="info">
        <AlertIcon />
        You are voting as {account}.
      </Alert>
      <Heading size="md">Rank Candidates</Heading>
      <VoteForm
        electionAddress={electionAddress}
        candidates={candidates}
        shuffledCandidates={shuffledCandidates}
      />
    </Stack>
  )
}
