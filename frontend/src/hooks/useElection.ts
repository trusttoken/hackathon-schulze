import { Election } from '@/types/Election'
import { useEffect, useState } from 'react'
import { fetchElection } from '../utils/fetchElection'

export const useElection = (electionId: string | undefined) => {
  const [election, setElection] = useState<Election>()

  useEffect(() => {
    const fetch = async () => {
      if (electionId) {
        const election = await fetchElection(electionId)
        setElection(election)
      }
    }
    fetch()
  }, [electionId])

  return election
}
