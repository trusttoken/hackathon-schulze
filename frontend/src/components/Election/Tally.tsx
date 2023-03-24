import { Election } from '@/types/Election'
import { mockElection } from '@/utils/mockElection'
interface Props {
  election: Election
}

function useElectionResults() {
  const { candidates } = mockElection
  return candidates.map(({ address }) => address)
}

export function Tally({ election }: Props) {
  const candidates = useElectionResults()
  return (
    <>
      Results for Election
      {candidates.map((address) => address)}
    </>
  )
}
