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

interface Props {
  candidates: Candidate[]
}

interface VoteFormSchema {
  candidates: Pick<Candidate, 'address'> & { rank: number }[]
}

export const VoteForm = ({ candidates }: Props) => {
  const { handleSubmit, register } = useForm<VoteFormSchema>({
    defaultValues: {
      candidates: candidates.map(({ address }) => ({ rank: 1, address })),
    },
  })

  if (!candidates) {
    return <p>Loading...</p>
  }

  const onSubmit = (data: VoteFormSchema) => {
    console.log('submitting', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading>Vote</Heading>
      {candidates.map(({ name, description, imageUrl }, index) => (
        <div key={index}>
          <Flex gap={6}>
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

          <NumberInput defaultValue={1} min={1} max={candidates.length}>
            <NumberInputField
              {...register(`candidates.${index}.rank`, { valueAsNumber: true })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
      ))}
      <Button type="submit">Submit Vote</Button>
    </form>
  )
}
