export enum ElectionState {
  'Register', 'Vote', 'Tally'
}

export interface Election {
  id: string
  state: ElectionState
}
