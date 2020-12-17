import { HOTELS_LIST_REQUESTED, HOTELS_LIST_SUCCEED, HOTELS_LIST_FAILED, ReportState, ReportActions } from '../../types'

export default function report(state: ReportState = { hotels: [], loading: false, error: '' }, action: ReportActions): ReportState {
  switch (action.type) {
    case HOTELS_LIST_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case HOTELS_LIST_SUCCEED:
      const hotelReport = action.payload
      return {
        ...state,
        loading: false,
        hotels: hotelReport
      }
    case HOTELS_LIST_FAILED:
      const error = action.payload
      return {
        ...state,
        loading: false,
        error: error
      }
    default:
      return state
  }
}
