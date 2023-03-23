import { Election } from "@/types/Election";
import { Input } from "@chakra-ui/react";


interface Props {
  election?: Election
}

export function Registration({ election }: Props) {
  if (!election) return <p>Loading...</p>
  
  return (
    <>
      Register for Election
      <Input placeholder='Enter Address' />
    </>
  )
}