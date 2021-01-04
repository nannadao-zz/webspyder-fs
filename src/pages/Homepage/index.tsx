import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'

import Table from '../../components/Table'
import { AppState } from '../../types'
import HotelFilter from '../../components/HotelFilter'
import Navbar from '../../components/Navbar'
import Calendar from '../../components/Calendar'
import { fetchHotelsList, fetchSortList } from '../../redux/actions/reportActions'

import './Homepage.css'

const Homepage = () => {
  const dispatch = useDispatch()

  const [searchHotels, setSearchHotels] = useState<string[]>([])
  const [searchDate, setSearchDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [sortBy] = useState('room_price')
  const [isDescending] = useState('true')

  const { hotels } = useSelector((state: AppState) => state.report)
  useEffect(() => {
    dispatch(fetchHotelsList(searchDate))
  }, [dispatch, searchDate])

  const handleInputDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDate(e.target.value)
  }

  const handleSearchDateChange = useCallback((date: string) => setSearchDate(date), [])

  const handleSearchHotelsChange = (hotels: string[]) => setSearchHotels(hotels)

  const handleFilterSubmit = () => {
    dispatch(fetchSortList(searchDate, sortBy, isDescending, searchHotels))
  }

  return (
    <>
      <Navbar />
      <div className='Homepage'>
        <div className='Homepage-sidebar'>
          <h2> Filter Data </h2>
          <div className='Homepage-form'>
            <form>
              {hotels.length > 0 ? (
                <HotelFilter
                  handleSearchHotelsChange={handleSearchHotelsChange}
                  searchDate={searchDate}
                />
              ) : (
                <p> No data to filter </p>
              )}
              <div className='calendar-input'>
                <label> Filter day: </label>
                <input
                  type='date'
                  id='checkin'
                  name='checkin'
                  value={searchDate}
                  onChange={handleInputDateChange}
                />
              </div>
            </form>
          </div>
          <Calendar searchDate={searchDate} handleSearchDateChange={handleSearchDateChange} />
          <button className='Sidebar-submit' onClick={handleFilterSubmit}>
            {' '}
            Search{' '}
          </button>
        </div>
        <div className='Homepage-content'>
          <h2> Helsinki ({hotels.length} properties) </h2>
          <Table searchDate={searchDate} searchHotels={searchHotels} />
        </div>
      </div>
    </>
  )
}

export default Homepage
