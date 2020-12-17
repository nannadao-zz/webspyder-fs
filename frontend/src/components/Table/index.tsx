import React from 'react'
import { useSelector } from 'react-redux'

import { AppState, HotelReportState } from '../../types'
import './Table.css'

export default function Table() {
  const { hotels } = useSelector((state: AppState) => state.report)

  return (
    <div className='Table'>
      <div className='Table-head'>
        <div className='large-cell'>
          <p> Hotel Name </p>
          <i className='fas fa-angle-double-down'></i>
        </div>
        <div className='large-cell'>
          <p> Room Type </p>
          <i className='fas fa-angle-double-down'></i>
        </div>
        <div className='small-cell'>
          <p> Room Price </p>
          <i className='fas fa-angle-double-down'></i>
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
