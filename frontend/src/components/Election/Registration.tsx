import { useRegistrationStatus } from '@/hooks/useRegistrationStatus'
import { Election } from '@/types/Election'
import { Button, Container, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { useState } from 'react'

interface Props {
  election?: Election
}

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()
  // 'account' being undefined means that we are not connected.
  if (account) return <button onClick={() => deactivate()}>Disconnect</button>
  else return <Button onClick={() => activateBrowserWallet()}>Connect</Button>
}

export function Registration({ election }: Props) {
  const { account } = useEthers()
  const [type, setType] = useState<'voter' | 'candidate'>('voter')
  const isRegistered = useRegistrationStatus(account)

  if (!account) {
    return (
      <>
        <p>Please connect your wallet</p>
        <ConnectButton />
      </>
    )
  }

  if (isRegistered) {
    return <p>Your address {account} is registered, wait for the election to start.</p>
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(`Registering ${account} as ${type}`)
  }

  return (
    <Container>
      <h1>Register for Election</h1>
      <form onSubmit={handleSubmit}>
        <Input value={account} disabled />
        <RadioGroup onChange={setType} value={type}>
          <Stack spacing={5} direction="row">
            <Radio value="voter">Voter</Radio>
            <Radio value="candidate">Candidate</Radio>
          </Stack>
        </RadioGroup>
        {type === 'candidate' && (
          <>
            <Input placeholder="Name" />
            <Input placeholder="Description" />
            <Input placeholder="Image" />
          </>
        )}
        <Button type="submit">Register</Button>
      </form>
    </Container>
  )
}
