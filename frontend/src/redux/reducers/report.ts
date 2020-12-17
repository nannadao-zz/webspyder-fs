import {
  HOTELS_LIST_REQUESTED,
  HOTELS_LIST_SUCCEED,
  HOTELS_LIST_FAILED,
  SORT_LIST_REQUESTED,
  SORT_LIST_SUCCEED,
  SORT_LIST_FAILED,
  ReportState,
  ReportActions
} from '../../types'

export default function report(
  state: ReportState = { hotels: [], loading: false, error: '' },
  action: ReportActions
): ReportState {
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
    case SORT_LIST_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case SORT_LIST_SUCCEED:
      const sortedList = action.payload
      return {
        ...state,
        loading: false,
        hotels: sortedList
      }
    case SORT_LIST_FAILED:
      const sortedError = action.payload
      return {
        ...state,
        loading: false,
        error: sortedError
      }
    default:
      return state
  }
}
