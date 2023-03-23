import { useCandidates } from '@/hooks/useCandidates'
import { useShuffledCandidates } from '@/hooks/useShuffledCandidates'
import { VoteForm } from './VoteForm'

interface Props {
  electionAddress: string
}

export function Vote({ electionAddress }: Props) {
  const candidates = useCandidates(electionAddress)
  const shuffledCandidates = useShuffledCandidates(candidates)

  if (!shuffledCandidates) {
    return <p>Loading...</p>
  }
  return <VoteForm candidates={shuffledCandidates} />
}
