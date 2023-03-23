import { Registration } from "@/components/Election/Registration"
import { useElection } from "@/hooks/useElection"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ElectionPage() {
  const router = useRouter()
  const {electionId} = router.query
  const election = useElection(electionId as string | undefined)

  return (
    <>
      <Registration election={election} />
    </>
  )
}