import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import React from 'react'

import store from './store'

import App from './components/App'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Upload from './components/Upload'

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signup" component={Signup} />
        <Route path="login" component={Login} />
        <Route path="upload" component={Upload} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
