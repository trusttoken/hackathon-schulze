import { Election } from '@/types/Election'
import { Heading, Text, VStack } from '@chakra-ui/react'
import { useElectionResults } from '@/hooks/useElectionResults'
import { mockElection } from '@/utils/mockElection'
import { useEffect, useState } from 'react'

interface Props {
  election: Election
}

export function Results({ election }: Props) {
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
