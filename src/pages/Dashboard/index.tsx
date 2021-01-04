import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { Line, Bar } from 'react-chartjs-2'
import axios from 'axios'
import { format, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns'

import { DashboardDateParams, AppState, LineGraphItem } from '../../types'
import { fetchHotelNames } from '../../redux/actions/reportActions'
import Navbar from '../../components/Navbar'
import './Dashboard.css'

export default function Dashboard() {
  const dispatch = useDispatch()
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))
  const [searchHotel, setSearchHotel] = useState('Hotel Finn')
  const { hotel_names } = useSelector((state: AppState) => state.report)
  const [graphLabels, setGraphLabels] = useState<string[]>([])
  const [graphValues, setGraphValues] = useState<number[]>([])
  const [barChartLabels, setBarChartLabels] = useState<string[]>([])
  const [barChartValues, setBarChartValues] = useState<number[]>([])
  const [curMonthAvg, setCurMonthAvg] = useState(0)
  const [prevMonthAvg, setPrevMonthAvg] = useState(0)

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleHotelChange = (event: any, value: any, reason: any) => {
    setSearchHotel(value)
  }

  useEffect(() => {
    dispatch(
      fetchHotelNames(
        format(currentMonth, 'y'),
        format(currentMonth, 'M'),
        format(currentMonth, 'd'),
        format(endOfMonth(currentMonth), 'd')
      )
    )
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/report/dashboard/', {
          params: {
            hotel: searchHotel,
            year: format(currentMonth, 'y'),
            month: format(currentMonth, 'M'),
            start_day: format(currentMonth, 'd'),
            end_day: format(endOfMonth(currentMonth), 'd')
          }
        })
        const labels: string[] = []
        const values: number[] = []
        data[0].line_graph.forEach((item: LineGraphItem) => {
          labels.push(format(item.created_date, 'd/M'))
          values.push(item.room_price)
        })
        setGraphLabels(labels)
        setGraphValues(values)
        const barChartLabels: string[] = []
        const barChartValues: number[] = []
        data[0].bar_chart.forEach((item: LineGraphItem) => {
          barChartLabels.push(format(item.created_date, 'M/yyyy'))
          barChartValues.push(item.room_price)
        })
        setBarChartLabels(barChartLabels)
        setBarChartValues(barChartValues)
        setCurMonthAvg(data[0].cur_avg.room_price__avg)
        setPrevMonthAvg(data[0].prev_avg.room_price__avg)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDashboard()
  }, [dispatch, searchHotel, currentMonth])

  return (
    <>
      <Navbar />
      <div className='Dashboard'>
        <div className='Dashboard-input'>
          <Autocomplete
            value={searchHotel}
            options={hotel_names}
            id='auto-complete'
            autoComplete
            includeInputInList
            onChange={(event, value, reason) => handleHotelChange(event, value, reason)}
            renderInput={(params) => (
              <TextField {...params} variant='outlined' label='Select A Hotel' margin='normal' />
            )}
          />
        </div>
        <div className='Dashboard-linegraph'>
          <div className='header'>
            <div className='column col-start'>
              <div className='icon' onClick={prevMonth}>
                <i className='fas fa-angle-left fa-lg'></i>
              </div>
            </div>
            <div className='column col-center'>
              <span> {format(currentMonth, 'MMMM')} </span>
            </div>
            <div className='column col-end'>
              <div className='icon' onClick={nextMonth}>
                <i className='fas fa-angle-right fa-lg'></i>
              </div>
            </div>
          </div>
          <Line
            data={{
              labels: graphLabels,
              datasets: [
                {
                  label: `${searchHotel}`,
                  data: graphValues,
                  borderColor: '#4741f2',
                  fill: false
                }
              ]
            }}
            height={150}
            width={800}
          />
        </div>
        <div className='Dashboard-Average'>
          <div className='Dashboard-Board'>
            <div className='header'>
              <p className='title'> ADR </p>
              <p className='month'> {format(new Date(), 'MMMM')} </p>
            </div>
            <div className='data'>
              <p className='number'> {curMonthAvg} </p>
              {curMonthAvg > prevMonthAvg ? (
                <i className='fas fa-caret-up fa-lg'></i>
              ) : (
                <i className='fas fa-caret-down fa-lg'></i>
              )}
              <p className='percentage'>
                {' '}
                {(((curMonthAvg - prevMonthAvg) / prevMonthAvg) * 100).toFixed(1)}%{' '}
              </p>
            </div>
          </div>

          <div className='Dashboard-Barchart'>
            <Bar
              height={200}
              width={600}
              data={{
                labels: barChartLabels,
                datasets: [
                  {
                    label: `${searchHotel}'s monthly ADR`,
                    data: barChartValues,
                    backgroundColor: [
                      '#e0c3ff',
                      '#cba7fc',
                      '#b48cf9',
                      '#9872f6',
                      '#7759f4',
                      '#4741f2'
                    ],
                    barThickness: 10
                  }
                ]
              }}
              options={{
                maintainAspectRatio: true,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true
                      }
                    }
                  ]
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
