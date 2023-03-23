import { Election } from '@/types/Election'
import { useShuffledCandidates } from '@/hooks/useShuffledCandidates'
import { VoteForm } from './VoteForm'

export function Vote() {
  // const candidates = useCandidates()
  const shuffledCandidates = useShuffledCandidates([])
  if (!shuffledCandidates) {
    return <p>Loading...</p>
  }
  return <VoteForm candidates={shuffledCandidates} />
}
