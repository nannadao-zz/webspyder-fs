import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Calendar from '../../components/Calendar'

import './Homepage.css'

const Homepage = () => {
  const [searchHotel, setSearchHotel] = useState('')

  return (
    <>
      <Navbar />
      <div className='Homepage'>
        <div className='Homepage-sidebar'>
          <h2> Filter Data </h2>
          <div className='Homepage-form'>
            <form>
              <input type='text' value={searchHotel} onChange={(e) => setSearchHotel(e.target.value)} />
            </form>
          </div>
          <Calendar />
        </div>
        <div className='Homepage-content'>
          <h2> Reports </h2>
        </div>
      </div>
    </>
  )
}

export default Homepage
