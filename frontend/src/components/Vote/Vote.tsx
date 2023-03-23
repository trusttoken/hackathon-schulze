import { Election } from '@/types/Election'
import { useShuffledCandidates } from '@/hooks/useShuffledCandidates'
import { VoteForm } from './VoteForm'

interface Props {
  election: Election
}

export function Vote({ election }: Props) {
  const shuffledCandidates = useShuffledCandidates(election.candidates)
  if (!shuffledCandidates) {
    return <p>Loading...</p>
  }
  return <VoteForm candidates={shuffledCandidates} />
}
