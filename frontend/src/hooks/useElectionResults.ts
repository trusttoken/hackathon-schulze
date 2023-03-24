import { Call, Falsy, useCall, useEthers } from '@usedapp/core'
import { Contract } from 'ethers'

export function useElectionResults(electionAddress: string) {
  const { chainId } = useEthers()
  const call: Falsy | Call = electionAddress && {
    args: [],
    contract: new Contract(electionAddress, [
      'function rankCandidates() external view returns (address[] memory) ',
    ]),
    method: 'rankCandidates',
  }
  const response = useCall(call, { chainId: chainId })?.value?.[0] as
    | string[]
    | undefined
  return response
}
