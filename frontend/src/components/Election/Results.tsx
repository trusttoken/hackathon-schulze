import { Heading, Text, VStack } from '@chakra-ui/react'
import { useElectionResults } from '@/hooks/useElectionResults'
import { useCandidates } from '@/hooks/useCandidates'
import { Candidate } from '@/types/Candidate'

interface Props {
  electionAddress: string
}

export function Results({ electionAddress }: Props) {
  const candidates = useCandidates(electionAddress)
  const results = useElectionResults(electionAddress)

  if (!candidates || !candidates.length || !results || !results.length) {
    return <p>Loading...</p>
  }

  const candidateMap = candidates.reduce(
    (map, candidate) => ({ ...map, [candidate.address]: candidate }),
    {} as Record<string, Candidate>,
  )

  return (
    <>
      <Heading>Results</Heading>
      <VStack textAlign="left" mt={4} spacing={4}>
        {results.map((address, rank) => {
          const candidate = candidateMap[address]
          return (
            <Text w="full">
              {rank + 1}. {candidate.name}
            </Text>
          )
        })}
      </VStack>
    </>
  )
}
