import { deploy, contract } from 'ethereum-mars'
import { SchulzeMethodElectionFactory } from '../build/artifacts'

deploy({ verify: true }, () => {
  contract(SchulzeMethodElectionFactory)
})
