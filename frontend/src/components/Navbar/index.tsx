import React from 'react'

import logo from '../../assets/logo.svg'
import './navbar.css'

const Navbar = () => (
  <nav className='navbar'>
    <div className='navbar-logo'> WEBSPYDER </div>
    <div className='navbar-links'>
      <h4> Home </h4>
      <h4> Dashboard </h4>
    </div>
  </nav>
)

export default Navbar
