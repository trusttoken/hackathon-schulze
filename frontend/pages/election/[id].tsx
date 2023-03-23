import { ConnectButton } from '@/components/ConnectButton'
import { Registration } from '@/components/Election/Registration'
import { Results } from '@/components/Election/Results'
import { Vote } from '@/components/Vote/Vote'
import { useElection } from '@/hooks/useElection'
import { Container } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'

export default function ElectionPage() {
  const { account } = useEthers()
  const router = useRouter()
  const { id } = router.query
  const election = useElection(id as string | undefined)

  if (!account) {
    return (
      <>
        <p>Please connect your wallet</p>
        <ConnectButton />
      </>
    )
  }

  if (!election) {
    return <p>Loading...</p>
  }

  return (
    <Container>
      <Registration election={election} />
      <Vote election={election} />
      <Results election={election} />
    </Container>
  )
}
