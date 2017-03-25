import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App'
import Home from './containers/Home'
import Signup from './containers/Signup'
import Login from './containers/Login'
import RequireAuth from './containers/RequireAuth'
import Favourites from './containers/Favourites'

import * as Actions from '../actions'

import { Provider } from 'mobx-react'
import { MainStore } from 'stores/MainStore'

const mainStore = new MainStore()
Actions.verifyAuth()

ReactDOM.render(
  <Provider store={mainStore}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='signup' component={Signup} />
        <Route path='login' component={Login} />
        <Route path='favourites' component={RequireAuth(Favourites)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
