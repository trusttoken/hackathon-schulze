import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { Candidate } from '@/types/Candidate'

interface Props {
  candidate: Candidate
}

export const CandidateItem = ({ candidate }: Props) => {
  const { imageUrl, description, name } = candidate
  return (
    <Flex gap={10}>
      <Box width={100} height={100} borderRadius={5} overflow="hidden">
        <Image
          src={`data:image/png;base64,${imageUrl}`}
          width={300}
          height={100}
          alt="Candidate image"
        />
      </Box>
      <Box>
        <Heading size="md">{name}</Heading>
        <Text>{description}</Text>
      </Box>
    </Flex>
  )
}
