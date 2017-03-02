import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import React from 'react'

import store from './store'

import App from './containers/App'
import Home from './containers/Home'
import LoginAndSignup from './containers/LoginAndSignup'
import Upload from './containers/Upload'
import Bangumi from './containers/Bangumi'

const history = syncHistoryWithStore(browserHistory, store)

function requireAuth (nextState, replace) {
  if (!localStorage.getItem('token')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={LoginAndSignup} />
        <Route path="upload" component={Upload} onEnter={requireAuth} />
        <Route path="bangumi/:bangumiId" component={Bangumi} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
