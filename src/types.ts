export const HOTELS_LIST_REQUESTED = 'HOTELS_LIST_REQUESTED'
export const HOTELS_LIST_SUCCEED = 'HOTELS_LIST_SUCCEED'
export const HOTELS_LIST_FAILED = 'HOTELS_LIST_FAILED'
export const SORT_LIST_REQUESTED = 'SORT_LIST_REQUESTED'
export const SORT_LIST_SUCCEED = 'SORT_LIST_SUCCEED'
export const SORT_LIST_FAILED = 'SORT_LIST_FAILED'

export type AppState = {
  report: ReportState
}

export type ReportState = {
  hotels: any
  loading: boolean
  error: any
}

export type HotelReportState = {
  id: number
  created_date: string
  hotel_name: string
  room_type: string
  room_price: number
}

export type ReportActions =
  | FetchHotelsRequested
  | fetchHotelsListSucceed
  | fetchHotelsListFailed
  | fetchSortListRequested
  | fetchSortListSucceed
  | fetchSortListFailed

export type FetchHotelsRequested = {
  type: typeof HOTELS_LIST_REQUESTED
  payload: {
    loading: boolean
  }
}

export type fetchHotelsListSucceed = {
  type: typeof HOTELS_LIST_SUCCEED
  payload: {
    data: any
  }
}

export type fetchHotelsListFailed = {
  type: typeof HOTELS_LIST_FAILED
  payload: {
    error: string
  }
}

export type fetchSortListRequested = {
  type: typeof SORT_LIST_REQUESTED
  payload: {
    loading: boolean
  }
}

export type fetchSortListSucceed = {
  type: typeof SORT_LIST_SUCCEED
  payload: {
    data: any
  }
}

export type fetchSortListFailed = {
  type: typeof SORT_LIST_FAILED
  payload: {
    error: string
  }
}

export type CalendarProps = {
  searchDate: string
  handleSearchDateChange: (day: string) => void
}

export type TableProps = {
  searchDate: string
}
