import { utils } from 'ethers'

export const SCHULZE_ELECTION_ABI = [
  'function state() view returns (uint8)',
] as const

export const SCHULZE_ELECTION_INTERFACE = new utils.Interface(
  SCHULZE_ELECTION_ABI,
)
