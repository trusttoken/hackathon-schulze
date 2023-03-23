import { Candidate } from '@/types/Candidate'
import {
  Button,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

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
      {candidates.map(({ name, description }, index) => (
        <div>
          <Heading size="sm">{name}</Heading>
          <Text>{description}</Text>
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
