import React from 'react'
import { Route } from 'react-router-dom'

import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'

const Routes = () => (
  <>
    <Route exact path='/' component={Homepage} />
    <Route exact path='/dashboard' component={Dashboard} />
  </>
)

export default Routes
