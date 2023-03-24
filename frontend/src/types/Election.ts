import { Candidate } from './Candidate'

export enum ElectionState {
  'Register',
  'Vote',
  'Tally',
}

export interface Election {
  id: string
  state: ElectionState
  candidates: Candidate[]
}

export type ParticipantType = 'voter' | 'candidate'
