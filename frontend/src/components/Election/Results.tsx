import { Heading, Stack, HStack, Flex } from '@chakra-ui/react'
import { useElectionResults } from '@/hooks/useElectionResults'
import { useCandidates } from '@/hooks/useCandidates'
import { Candidate } from '@/types/Candidate'
import { CandidateItem } from '../CandidateItem'

interface Props {
  electionAddress: string
}

export function Results({ electionAddress }: Props) {
  const candidates = useCandidates(electionAddress)
  const results = useElectionResults(electionAddress)

  console.log({ results })

  if (!candidates || !candidates.length || !results || !results.length) {
    return <p>Loading...</p>
  }

  const candidateMap = candidates.reduce(
    (map, candidate) => ({ ...map, [candidate.address]: candidate }),
    {} as Record<string, Candidate>,
  )

  return (
    <Stack spacing={10}>
      <Heading>Results</Heading>
      <Stack spacing={4}>
        {results.map((address, rank) => {
          const candidate = candidateMap[address]
          return (
            <Flex justifyContent="center" alignItems="center" gap={7}>
              <Heading color="gray.600">#{rank + 1}</Heading>
              <CandidateItem candidate={candidate} />
            </Flex>
          )
        })}
      </Stack>
    </Stack>
  )
}
