export const HOTELS_LIST_REQUESTED = 'HOTELS_LIST_REQUESTED'
export const HOTELS_LIST_SUCCEED = 'HOTELS_LIST_SUCCEED'
export const HOTELS_LIST_FAILED = 'HOTELS_LIST_FAILED'
export const SORT_LIST_REQUESTED = 'SORT_LIST_REQUESTED'
export const SORT_LIST_SUCCEED = 'SORT_LIST_SUCCEED'
export const SORT_LIST_FAILED = 'SORT_LIST_FAILED'
export const HOTEL_NAMES_REQUESTED = 'HOTEL_NAMES_REQUESTED'
export const HOTEL_NAMES_SUCCEED = 'HOTEL_NAMES_SUCCEED'
export const HOTEL_NAMES_FAILED = 'HOTEL_NAMES_FAILED'
export const DASHBOARD_REQUESTED = 'DASHBOARD_REQUESTED'
export const DASHBOARD_SUCCEED = 'DASHBOARD_SUCCEED'
export const DASHBOARD_FAILED = 'DASHBOARD_FAILED'

export type AppState = {
  report: ReportState
  dashboard: DashboardState
}

export type ReportState = {
  hotels: any
  hotel_names: any
  loading: boolean
  error: any
}

export type DashboardState = {
  cur_month_avg: number
  prev_month_avg: number
  monthly_rate_labels: string[]
  monthly_rate_data: number[]
  loading: boolean
  error: string
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
  | fetchHotelNamesRequested
  | fetchHotelNamesSucceed
  | fetchHotelNamesFailed

export type DashboardActions =
  | fetchDashboardRequested
  | fetchDashboardSucceed
  | fetchDashboardFailed

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

export type fetchHotelNamesRequested = {
  type: typeof HOTEL_NAMES_REQUESTED
  payload: {
    loading: boolean
  }
}

export type fetchHotelNamesSucceed = {
  type: typeof HOTEL_NAMES_SUCCEED
  payload: {
    data: any
  }
}

export type fetchHotelNamesFailed = {
  type: typeof HOTEL_NAMES_FAILED
  payload: {
    error: string
  }
}

export type fetchDashboardRequested = {
  type: typeof DASHBOARD_REQUESTED
  payload: {
    loading: boolean
  }
}
export type fetchDashboardSucceed = {
  type: typeof DASHBOARD_SUCCEED
  payload: {
    data: any
  }
}
export type fetchDashboardFailed = {
  type: typeof DASHBOARD_FAILED
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
  searchHotels: string[]
}

export type HotelFilterProps = {
  searchDate: string
  handleSearchHotelsChange: (hotels: string[]) => void
}

export type TableResponse = {
  id: number
  created_date: string
  checkin_date: string
  hotel_name: string
  room_type: string
  room_price: number
}

export type DashboardDateParams = {
  year: string
  month: string
  start_day: string
  end_day: string
}

export type LineGraphItem = {
  created_date: Date
  room_price: number
}
