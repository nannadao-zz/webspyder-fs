import { Dispatch } from 'redux'
import axios from 'axios'

import {
  HOTELS_LIST_REQUESTED,
  HOTELS_LIST_SUCCEED,
  HOTELS_LIST_FAILED,
  SORT_LIST_REQUESTED,
  SORT_LIST_SUCCEED,
  SORT_LIST_FAILED
} from '../../types'

export const fetchHotelsList = (date: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: HOTELS_LIST_REQUESTED })
    const { data } = await axios.get('http://localhost:8000/api/report/all/', {
      params: { date: date }
    })
    return dispatch(fetchHotelsListSucceed(data))
  } catch (error) {
    return dispatch(fetchHotelsListFailed(error.message))
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

export const fetchSortList = (searchDate: string, sortBy: string, descending: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: SORT_LIST_REQUESTED })
    const { data } = await axios.get('http://localhost:8000/api/report/sorted/', {
      params: { date: searchDate, sortBy: sortBy, descending: descending }
    })
    return dispatch(fetchSortListSucceed(data))
  } catch (error) {
    return dispatch(fetchSortListFailed(error.message))
  }
}

const fetchSortListSucceed = (data: any) => {
  return {
    type: SORT_LIST_SUCCEED,
    payload: data
  }
}

const fetchSortListFailed = (error: string) => {
  return {
    type: SORT_LIST_FAILED,
    payload: error
  }
}
