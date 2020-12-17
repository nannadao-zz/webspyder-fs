import { Dispatch } from 'redux'
import axios from 'axios'

import { HOTELS_LIST_REQUESTED, HOTELS_LIST_SUCCEED, HOTELS_LIST_FAILED, HotelReportState } from '../../types'

export const fetchHotelsList = (date: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: HOTELS_LIST_REQUESTED })
    const { data } = await axios.get('http://localhost:8000/api/report/all/', {
      params: { date: '2020-12-16' }
    })
    return dispatch(fetchHotelsListSucceed(data))
  } catch (error) {
    return dispatch(fetchHotelsListFailed(error))
  }
}

const fetchHotelsListSucceed = (data: any) => {
  return {
    type: HOTELS_LIST_SUCCEED,
    payload: data
  }
}

const fetchHotelsListFailed = (error: string) => {
  return {
    type: HOTELS_LIST_FAILED,
    payload: error
  }
}
