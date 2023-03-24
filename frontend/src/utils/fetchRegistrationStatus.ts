export const fetchRegistrationStatus = async (account: string) => {
  const isRegistered = localStorage.getItem(`registration-status-${account}`)
  return isRegistered ? JSON.parse(isRegistered) : false
}
