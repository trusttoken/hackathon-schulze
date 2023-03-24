import { Call, Falsy, useCall, useEthers } from '@usedapp/core'
import { BigNumber, Contract } from 'ethers'

export const useBallot = (
  account: string | undefined,
  electionAddress: string,
) => {
  const { chainId } = useEthers()
  const call: Falsy | Call = electionAddress && {
    args: [account ?? ''],
    contract: new Contract(electionAddress, [
      'function ballotOf(address) view returns(uint256)',
    ]),
    method: 'ballotOf',
  }
  const response = useCall(call, { chainId: chainId })?.value?.[0] as BigNumber
  return response?.toNumber() ?? 0
}
