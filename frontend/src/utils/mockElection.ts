import { ElectionState } from '../types/Election'
import { Candidate } from '../types/Candidate'

export const mockElection = {
  id: '0x000election',
  state: ElectionState.Register,
  candidates: [
    {
      name: 'Project 1',
      description: 'A great project 1',
      address: '0x123',
    },
    {
      name: 'Project 2',
      description: 'A great project 1',
      address: '0x456',
    },
    {
      name: 'Project 3',
      description: 'A great project 1',
      address: '0x789',
    },
  ],
}
