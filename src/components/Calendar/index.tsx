import React, { useState } from 'react'
import moment from 'moment'
import {
  addDays,
  addMonths,
  subMonths,
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  parse
} from 'date-fns'

import { CalendarProps } from '../../types'
import './Calendar.css'

const Calendar: React.FC<CalendarProps> = ({ searchDate, handleSearchDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(parse(searchDate, 'yyyy-MM-dd', new Date()))
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }
  const header = () => {
    const dateFormat = 'MMMM yyyy'
    return (
      <div className='header' key='header'>
        <div className='column col-start'>
          <div className='icon' onClick={prevMonth}>
            <i className='fas fa-angle-left'></i>
          </div>
        </div>
        <div className='column col-center'>
          <span> {format(currentDate, dateFormat)} </span>
        </div>
        <div className='column col-end'>
          <div className='icon' onClick={nextMonth}>
            <i className='fas fa-angle-right'></i>
          </div>
        </div>
      </div>
    )
  }
  const daysOfWeek = () => {
    const dateFormat = 'ccc'
    const days = []
    const startDate = startOfWeek(currentDate)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='column col-center' key={format(addDays(startDate, i), dateFormat)}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    return <div className='days body'> {days} </div>
  }

  const cells = () => {
    const dateFormat = 'd'
    const rows = []
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const onDateClick = (day: any) => {
      setSelectedDate(day)
      handleSearchDateChange(format(day, 'yyyy-MM-dd'))
    }
    let days = []
    let day = startDate
    let formattedDate = ''

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const cloneDayWithoutFormat = day
        days.push(
          <div
            className={`column cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            } `}
            key={moment(day).format('MMMM Do YYYY')}
            onClick={() => onDateClick(cloneDayWithoutFormat)}
          >
            <p className='number'>
              <span className='numberCircle'>
                <span> {formattedDate} </span>
              </span>
            </p>
          </div>
        )
        day = addDays(day, 1)
      }

      rows.push(
        <div className='row' key={format(day, 'ww')}>
          {' '}
          {days}{' '}
        </div>
      )
      days = []
    }
    return <div className='body'> {rows} </div>
  }

  return (
    <div className='calendar'>
      <div key='calendar-header'> {header()} </div>
      <div key='calendar-body'> {daysOfWeek()} </div>
      <div key='calendar-cells'> {cells()} </div>
    </div>
  )
}

export default Calendar
