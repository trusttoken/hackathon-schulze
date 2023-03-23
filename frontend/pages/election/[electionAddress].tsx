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
  const electionAddress = router.query.electionAddress as string | undefined
  const electionState = useElectionState(electionAddress)

  if (!account) {
    return (
      <>
        <p>Please connect your wallet</p>
        <ConnectButton />
      </>
    )
  }

  if (!electionAddress || electionState === undefined) {
    return <p>Loading...</p>
  }

  return (
    <Container>
      {electionState === ElectionState.Register && (
        <Registration electionAddress={electionAddress} />
      )}
      {electionState === ElectionState.Vote && (
        <Vote electionAddress={electionAddress} />
      )}
      {electionState === ElectionState.Tally && (
        <Results electionAddress={electionAddress} />
      )}
    </Container>
  )
}
