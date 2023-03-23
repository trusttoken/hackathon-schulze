import { Candidate } from '@/types/Candidate'
import { PLACEHOLDER_IMAGE } from './placeholderImage'

export const fetchCandidates = (candidateAddresses: string[]) => {
  const candidates: Candidate[] = candidateAddresses.map((address, i) => ({
    address,
    name: `name${i}`,
    description: `description${i}`,
    imageUrl: PLACEHOLDER_IMAGE,
  }))
  return candidates
}
