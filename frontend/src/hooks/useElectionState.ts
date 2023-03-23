import { Election, ElectionState } from '@/types/Election'
import { Call, Falsy, useCall, useEthers } from '@usedapp/core'
import { BigNumber, Contract } from 'ethers'

export const useElectionState = (electionId: string | undefined) => {
  const { chainId } = useEthers()
  const call: Falsy | Call = electionId && {
    args: [],
    contract: new Contract(electionId, [
      'function state() view returns(uint256)',
    ]),
    method: 'state',
  }
  const response = useCall(call, { chainId: chainId })?.value?.[0]
  if (!response) return undefined

  return BigNumber.from(response).toNumber() as number
}
