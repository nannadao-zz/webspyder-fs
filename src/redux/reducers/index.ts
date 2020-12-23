import { combineReducers } from 'redux'

import report from './report'

const createRootReducer = () =>
  combineReducers({
    report
  })

export default createRootReducer
