import { Election } from "@/pages/election/[id]";


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