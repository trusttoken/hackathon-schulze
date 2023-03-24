import { useBallot } from '@/hooks/useBallot'
import { useCandidates } from '@/hooks/useCandidates'
import { useRegistrationStatus } from '@/hooks/useRegistrationStatus'
import { useShuffledCandidates } from '@/hooks/useShuffledCandidates'
import { Alert, AlertIcon, Box, Heading, Stack } from '@chakra-ui/react'
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
  const isRegisteredAsVoter = useRegistrationStatus(
    account,
    electionAddress,
    'voter',
  )

  if (!candidates || !shuffledCandidates) {
    return <p>Loading...</p>
  }

  return (
    <Stack spacing={5}>
      <Heading>Rank Candidates</Heading>
      {isRegisteredAsVoter ? (
        <>
          <Alert status="info">
            <AlertIcon />
            You are voting as {account}.
          </Alert>
        </>
      ) : (
        <Alert status="error">
          <AlertIcon />
          Sorry, you are not registered as a voter. Voting won't work.
        </Alert>
      )}
      {!!ballot && (
        <Alert status="success">
          <AlertIcon />
          You have successfully voted. If you vote again, it will update your
          preference.
        </Alert>
      )}
      <Box paddingTop={10}>
        <VoteForm
          disabled={!isRegisteredAsVoter}
          electionAddress={electionAddress}
          candidates={candidates}
          shuffledCandidates={shuffledCandidates}
        />
      </Box>
    </Stack>
  )
}
