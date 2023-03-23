import { useRegistrationStatus } from '@/hooks/useRegistrationStatus'
import { ParticipantType, Election } from '@/types/Election'
import {
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

export function Registration() {
  const { account } = useEthers()
  const [type, setType] = useState<ParticipantType>('voter')
  const { isRegistered, register } = useRegistrationStatus(account)

  if (isRegistered) {
    return (
      <p>
        Your address {account} is registered, wait for the election to start.
      </p>
    )
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(`Registering ${account} as ${type}`)
    register(true)
  }

  return (
    <>
      <Heading>Register for Election</Heading>
      <form onSubmit={handleSubmit}>
        <Input value={account} disabled />
        <RadioGroup onChange={(e: ParticipantType) => setType(e)} value={type}>
          <Stack spacing={5} direction="row">
            <Radio value="voter">Voter</Radio>
            <Radio value="candidate">Candidate</Radio>
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
        <Button type="submit">Register</Button>
      </form>
    </>
  )
}
