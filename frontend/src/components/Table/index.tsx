import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchSortList } from '../../redux/actions/reportActions'
import { AppState, TableProps, HotelReportState } from '../../types'
import './Table.css'

const Table: React.FC<TableProps> = ({ searchDate }) => {
  const dispatch = useDispatch()
  const { hotels } = useSelector((state: AppState) => state.report)
  const [isDescending, setIsDescending] = useState(false)

  const handleSortHotelName = () => {
    setIsDescending(!isDescending)
    if (isDescending) {
      dispatch(fetchSortList(searchDate, 'hotel_name', 'true'))
    } else if (!isDescending) {
      dispatch(fetchSortList(searchDate, 'hotel_name', 'false'))
    }
  }

  const handleSortRoomType = () => {
    setIsDescending(!isDescending)
    if (isDescending) {
      dispatch(fetchSortList(searchDate, 'room_type', 'true'))
    } else if (!isDescending) {
      dispatch(fetchSortList(searchDate, 'room_type', 'false'))
    }
  }

  const handleSortRoomPrice = () => {
    setIsDescending(!isDescending)
    if (isDescending) {
      dispatch(fetchSortList(searchDate, 'room_price', 'true'))
    } else if (!isDescending) {
      dispatch(fetchSortList(searchDate, 'room_price', 'false'))
    }
  }

  return (
    <div className='Table'>
      <div className='Table-head'>
        <div className='large-cell'>
          <p> Hotel Name </p>
          <i className='fas fa-angle-double-down' onClick={handleSortHotelName}></i>
        </div>
        <div className='large-cell'>
          <p> Room Type </p>
          <i className='fas fa-angle-double-down' onClick={handleSortRoomType}></i>
        </div>
        <div className='small-cell'>
          <p> Room Price </p>
          <i className='fas fa-angle-double-down' onClick={handleSortRoomPrice}></i>
        </div>
      </div>
      {hotels.map((hotel: HotelReportState) => (
        <div key={hotel.id} className='table-content'>
          <div className='large-cell'>{hotel.hotel_name}</div>
          <div className='large-cell'>{hotel.room_type}</div>
          <div className='small-cell'>{hotel.room_price} € </div>
        </div>
      ))}
    </div>
  )
}

export default Table
