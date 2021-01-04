import {
  HOTELS_LIST_REQUESTED,
  HOTELS_LIST_SUCCEED,
  HOTELS_LIST_FAILED,
  SORT_LIST_REQUESTED,
  SORT_LIST_SUCCEED,
  SORT_LIST_FAILED,
  HOTEL_NAMES_REQUESTED,
  HOTEL_NAMES_SUCCEED,
  HOTEL_NAMES_FAILED,
  ReportState,
  ReportActions
} from '../../types'

export default function report(
  state: ReportState = { hotels: [], hotel_names: [], loading: false, error: '' },
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
    case HOTEL_NAMES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case HOTEL_NAMES_SUCCEED:
      return {
        ...state,
        loading: false,
        hotel_names: action.payload
      }
    case HOTEL_NAMES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
