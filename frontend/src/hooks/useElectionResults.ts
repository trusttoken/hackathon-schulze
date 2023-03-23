import { useState, useEffect, useMemo } from 'react'
import { Candidate } from '@/types/Candidate'
import { mockElection } from '@/utils/mockElection'

export function useElectionResults() {
  // replace with useDapp call to rankCandidates view on Election contract
  const candidates = useMemo(() => {
    const { candidates } = mockElection
    return candidates
  }, [])

  return candidates
}
