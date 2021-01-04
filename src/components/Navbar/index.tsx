import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => (
  <nav className='navbar'>
    <div className='navbar-logo'> WEBSPYDER </div>
    <div className='navbar-links'>
      <Link to={'/'}>
        <h4> Home </h4>
      </Link>
      <Link to={'/dashboard'}>
        <h4> Dashboard </h4>
      </Link>
    </div>
  </nav>
)

export default Navbar
