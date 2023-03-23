import { ConnectButton } from '@/components/ConnectButton'
import { Registration } from '@/components/Election/Registration'
import { Results } from '@/components/Election/Results'
import { Vote } from '@/components/Vote/Vote'
import { useElectionState } from '@/hooks/useElectionState'
import { ElectionState } from '@/types/Election'
import { Container } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'

export default function ElectionPage() {
  const { account } = useEthers()
  const router = useRouter()
  const { electionAddress } = router.query
  const electionState = useElectionState(electionAddress as string | undefined)

  if (!account) {
    return (
      <>
        <p>Please connect your wallet</p>
        <ConnectButton />
      </>
    )
  }

  if (electionState === undefined) {
    return <p>Loading...</p>
  }

  return (
    <Container>
      {electionState === ElectionState.Register && <Registration />}
      {electionState === ElectionState.Vote && <Vote />}
      {electionState === ElectionState.Tally && <Results />}
    </Container>
  )
}
