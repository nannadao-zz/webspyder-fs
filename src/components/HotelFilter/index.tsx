/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { parse, format } from 'date-fns'

import { fetchHotelNames } from '../../redux/actions/reportActions'
import { AppState, HotelFilterProps } from '../../types'
import './HotelFilter.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(3)
      }
    }
  })
)

const HotelFilter: React.FC<HotelFilterProps> = ({ searchDate, handleSearchHotelsChange }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    const parsedStartDate = parse(searchDate, 'yyyy-MM-dd', new Date())
    dispatch(
      fetchHotelNames(
        format(parsedStartDate, 'y'),
        format(parsedStartDate, 'M'),
        format(parsedStartDate, 'd'),
        format(parsedStartDate, 'd')
      )
    )
  }, [searchDate, dispatch])

  const { hotel_names } = useSelector((state: AppState) => state.report)

  const handleChange = (event: any, value: any, reason: any) => {
    const selectedHotelsArray: string[] = []
    value.map((item: string) => {
      selectedHotelsArray.push(item)
    })
    handleSearchHotelsChange(selectedHotelsArray)
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id='tags-outlined'
        options={hotel_names}
        filterSelectedOptions
        onChange={(event, value, reason) => handleChange(event, value, reason)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='Select Hotels'
            placeholder='Filter Hotels'
          />
        )}
      />
    </div>
  )
}

export default HotelFilter
