import { Candidate } from '@/types/Candidate'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'

export const useShuffledCandidates = (candidates: Candidate[] | undefined) => {
  const [shuffledCandidates, setShuffledCandidates] = useState<Candidate[]>()

  useEffect(() => {
    if (candidates && candidates.length) {
      setShuffledCandidates(shuffle(candidates))
    }
  }, [candidates])

  return shuffledCandidates
}
