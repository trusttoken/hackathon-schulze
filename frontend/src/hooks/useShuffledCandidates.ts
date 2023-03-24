import { Candidate } from '@/types/Candidate'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'

export const useShuffledCandidates = (candidates: Candidate[] | undefined) => {
  const [shuffledCandidates, setShuffledCandidates] = useState<Candidate[]>()
  const [hasShuffled, setHasShuffled] = useState(false)

  useEffect(() => {
    if (candidates && candidates.length && !hasShuffled) {
      setHasShuffled(true)
      setShuffledCandidates(shuffle(candidates))
    }
  }, [candidates, hasShuffled])

  return shuffledCandidates
}
