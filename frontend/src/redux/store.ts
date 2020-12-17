import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import createRootReducer from './reducers'

const initState = {
  report: {
    hotels: [],
    loading: false,
    error: ''
  }
}

const makeStore = (initialState = initState) => {
  let composeEnhancers = compose
  const middlewares = [thunk]
  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const localStorageState = localStorage.getItem('all-hats')
  if (localStorageState) {
    initialState = JSON.parse(localStorageState)
  }

  const store = createStore(createRootReducer(), initialState, composeEnhancers(applyMiddleware(...middlewares)))

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default makeStore
