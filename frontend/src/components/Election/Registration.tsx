import { useRegistrationStatus } from '@/hooks/useRegistrationStatus'
import { ParticipantType, Election } from '@/types/Election'
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { useState } from 'react'

interface Props {
  electionAddress: string
}

export function Registration({ electionAddress }: Props) {
  const { account } = useEthers()
  const [type, setType] = useState<ParticipantType>('voter')
  const isRegisteredAsVoter = useRegistrationStatus(
    account,
    electionAddress,
    'voter',
  )
  const isRegisteredAsCandidate = useRegistrationStatus(
    account,
    electionAddress,
    'candidate',
  )

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(`Registering ${account} as ${type}`)
  }

  return (
    <Stack spacing={5}>
      <Heading>Register for Election</Heading>
      {isRegisteredAsVoter && (
        <Alert status="success">
          <AlertIcon />
          You're registered as a voter, cast your vote when the election begins!
        </Alert>
      )}
      {isRegisteredAsCandidate && (
        <Alert status="success">
          <AlertIcon />
          You're registered as a candidate, good luck!
        </Alert>
      )}
      {(isRegisteredAsCandidate || isRegisteredAsVoter) && (
        <p>Insert funny gif here</p>
      )}
      {(!isRegisteredAsCandidate || !isRegisteredAsVoter) && (
        <form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input value={account} disabled />
            </FormControl>
            <RadioGroup
              onChange={(e: ParticipantType) => setType(e)}
              value={type}
            >
              <Stack spacing={5} direction="row">
                {!isRegisteredAsVoter && <Radio value="voter">Voter</Radio>}
                {!isRegisteredAsCandidate && (
                  <Radio value="candidate">Candidate</Radio>
                )}
              </Stack>
            </RadioGroup>
            {type === 'candidate' && (
              <>
                <FormControl>
                  <FormLabel>Project Name</FormLabel>
                  <Input placeholder="Name" />
                </FormControl>
                <FormControl>
                  <FormLabel>Project Description</FormLabel>
                  <Textarea placeholder="Description" />
                </FormControl>
              </>
            )}
            <Button colorScheme="blue" type="submit">
              Register
            </Button>
          </Stack>
        </form>
      )}
    </Stack>
  )
}
