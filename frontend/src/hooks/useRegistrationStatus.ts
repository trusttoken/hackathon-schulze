import { useEffect, useState } from 'react'
import { fetchRegistrationStatus } from '@/utils/fetchRegistrationStatus'

export function useRegistrationStatus(account: string | undefined) {
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    getRegistrationStatus()
  }, [account])

  async function getRegistrationStatus() {
    if (!account) return
    const _isRegistered = await fetchRegistrationStatus(account)
    setIsRegistered(_isRegistered)
  }

  function register(status: boolean) {
    if (!account) alert('Connect wallet to register')
    localStorage.setItem(
      `registration-status-${account}`,
      JSON.stringify(status),
    )
    getRegistrationStatus()
  }

  return {
    isRegistered,
    register,
  }
}
