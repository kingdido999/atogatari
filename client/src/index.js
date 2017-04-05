import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import React from 'react'

import { resetErrorMessage } from './actions/common'
import { requireAuth } from './utils'
import store from './store'

import App from './containers/App'
import Home from './containers/Home'
import LoginAndSignup from './containers/LoginAndSignup'
import Upload from './containers/Upload'
import Screenshot from './containers/Screenshot'
import Tag from './containers/Tag'
import User from './containers/User'
import UserFavorites from './containers/UserFavorites'
import UserUploads from './containers/UserUploads'

import '../semantic/dist/semantic.min.css'

const history = syncHistoryWithStore(browserHistory, store)
history.listen(() => store.dispatch(resetErrorMessage()))

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={LoginAndSignup} />
        <Route path="upload" component={Upload} onEnter={requireAuth} />
        <Route path="screenshot/:screenshotId" component={Screenshot} />
        <Route path="tag/:name" component={Tag} />
        <Route path="user/:userId" component={User} onEnter={requireAuth}>
          <Route path="favorites" component={UserFavorites} />
          <Route path="uploads" component={UserUploads} />
        </Route>
        <Route path="*" component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
