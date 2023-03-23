import { Call, Falsy, useCall, useEthers } from '@usedapp/core'
import { Contract } from 'ethers'

export const useCandidateAddresses = (electionAddress: string) => {
  const { chainId } = useEthers()
  const call: Falsy | Call = electionAddress && {
    args: [],
    contract: new Contract(electionAddress, [
      'function getCandidates() view returns(address[] memory)',
    ]),
    method: 'getCandidates',
  }
  const response = useCall(call, { chainId: chainId })?.value?.[0]
  return response
}
