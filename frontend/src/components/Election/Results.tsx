import { Heading, Text, VStack } from '@chakra-ui/react'
import { useElectionResults } from '@/hooks/useElectionResults'

interface Props {
  electionAddress: string
}

export function Results({ electionAddress }: Props) {
  const candidates = useElectionResults()
  return (
    <>
      <Heading>Results</Heading>
      <VStack textAlign="left" mt={4} spacing={4}>
        {candidates.map(({ address, name, description }, i) => (
          <Text w="full">
            {i + 1}. {name}
          </Text>
        ))}
      </VStack>
    </>
  )
}
