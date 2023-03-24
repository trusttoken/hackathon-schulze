import { ParticipantType } from '@/types/Election'
import { Call, Falsy, useCall, useEthers } from '@usedapp/core'
import { Contract } from 'ethers'

const VOTER_ROLE =
  '0x72c3eec1760bf69946625c2d4fb8e44e2c806345041960b434674fb9ab3976cf'

const CANDIDATE_ROLE =
  '0x262ba5fdd1dad9ccb8241da1a07fd1fd1c160e2ff97efc222645f94f62d5b43a'

export const useRegistrationStatus = (
  account: string | undefined,
  electionAddress: string,
  role: ParticipantType,
) => {
  const { chainId } = useEthers()
  const ROLE = role === 'voter' ? VOTER_ROLE : CANDIDATE_ROLE
  const hasVoterRoleCall: Falsy | Call = electionAddress && {
    args: [ROLE, account ?? ''],
    contract: new Contract(electionAddress, [
      'function hasRole(bytes32 role, address account) view returns(bool)',
    ]),
    method: 'hasRole',
  }
  const hasVoterRole = useCall(hasVoterRoleCall, { chainId: chainId })
    ?.value?.[0] as boolean
  return hasVoterRole
}
