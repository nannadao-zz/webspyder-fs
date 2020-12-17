import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'

import Table from '../../components/Table'
import { AppState } from '../../types'
import Navbar from '../../components/Navbar'
import Calendar from '../../components/Calendar'
import { fetchHotelsList } from '../../redux/actions/reportActions'

import './Homepage.css'

const Homepage = () => {
  const dispatch = useDispatch()

  const [searchHotel, setSearchHotel] = useState('')
  const [searchDate, setSearchDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const { hotels } = useSelector((state: AppState) => state.report)

  useEffect(() => {
    dispatch(fetchHotelsList(searchDate))
  }, [dispatch, searchDate])

  const handleSearchDateChange = useCallback((date: string) => setSearchDate(date), [])
  return (
    <>
      <Navbar />
      <div className='Homepage'>
        <div className='Homepage-sidebar'>
          <h2> Filter Data </h2>
          <div className='Homepage-form'>
            <form>
              <input
                type='text'
                value={searchHotel}
                onChange={(e) => setSearchHotel(e.target.value)}
              />
            </form>
          </div>
          <Calendar searchDate={searchDate} handleSearchDateChange={handleSearchDateChange} />
        </div>
        <div className='Homepage-content'>
          <h2> Helsinki ({hotels.length} properties) </h2>
          <Table searchDate={searchDate} />
        </div>
      </div>
    </>
  )
}

export default Homepage
