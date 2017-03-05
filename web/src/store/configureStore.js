import { createStore, compose, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'  // ensures promises are resolved when they hit reducers
// import ReduxPromise from 'redux-promise'
import rootReducer from '../reducers'

export default function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      // compose is needed when there are multiple function transformations
      applyMiddleware(promiseMiddleware()),
      // applyMiddleware(ReduxPromise),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
