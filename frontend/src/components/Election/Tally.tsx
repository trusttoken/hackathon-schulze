import { Election } from "@/types/Election";


interface Props {
  election?: Election
}

export function Tally({ election }: Props) {
  if (!election) return <></>
  
  return (
    <>
      Results for Election
    </>
  )
}