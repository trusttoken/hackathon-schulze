import { Election } from "@/types/Election"


interface Props {
  election?: Election
}

export function Vote({ election }: Props) {
  if (!election) return <></>
  
  return (
    <>
      Vote for Election
    </>
  )
}