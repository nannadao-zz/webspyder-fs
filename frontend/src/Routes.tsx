import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Homepage from './pages/Homepage'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Homepage} />
  </Switch>
)

export default Routes
