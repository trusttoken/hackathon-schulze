import { Candidate } from '@/types/Candidate'
import {
  Box,
  Button,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useContractFunction } from '@usedapp/core'
import { Contract } from 'ethers'
import { toBallotArgument } from '@/utils/toBallotArgument'

interface Props {
  electionAddress: string
  candidates: Candidate[]
  shuffledCandidates: Candidate[]
}

export type CandidateChoice = Pick<Candidate, 'address'> & { rank: number }
export interface VoteFormSchema {
  candidates: CandidateChoice[]
}

export const VoteForm = ({
  electionAddress,
  shuffledCandidates,
  candidates,
}: Props) => {
  const { handleSubmit, register } = useForm<VoteFormSchema>({
    defaultValues: {
      candidates: candidates.map(({ address }) => ({ rank: 1, address })),
    },
  })
  const { send } = useContractFunction(
    new Contract(electionAddress, ['function vote(uint256)']),
    'vote',
  )

  if (!candidates) {
    return <p>Loading...</p>
  }

  const onSubmit = async (ballotData: VoteFormSchema) => {
    const ballotArgument = toBallotArgument(ballotData.candidates, candidates)
    console.log('argument', ballotArgument)
    await send(ballotArgument)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {shuffledCandidates.map(({ name, description, imageUrl }, index) => (
        <div key={index}>
          <Flex gap={6}>
            <div>
              <NumberInput defaultValue={1} min={1} max={candidates.length}>
                <NumberInputField
                  {...register(`candidates.${index}.rank`, {
                    valueAsNumber: true,
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </div>
            <Box width={100} height={100} borderRadius={5} overflow="hidden">
              <Image
                src={`data:image/png;base64,${imageUrl}`}
                width={300}
                height={100}
                alt="Candidate image"
              />
            </Box>
            <Box>
              <Heading size="sm">{name}</Heading>
              <Text>{description}</Text>
            </Box>
          </Flex>
        </div>
      ))}
      <Button type="submit">Submit Vote</Button>
    </form>
  )
}
