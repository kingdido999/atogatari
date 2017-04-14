import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import React from 'react'

import { resetErrorMessageIfNeeded } from './actions/common'
import { requireAuth } from './utils'
import store from './store'

import App from './containers/App'
import ScreenshotsContainer from './containers/ScreenshotsContainer'
import LoginContainer from './containers/LoginContainer'
import UploadContainer from './containers/UploadContainer'
import ScreenshotContainer from './containers/ScreenshotContainer'
import TagContainer from './containers/TagContainer'
import UserContainer from './containers/UserContainer'
import UserFavoritesContainer from './containers/UserFavoritesContainer'
import UserUploadsContainer from './containers/UserUploadsContainer'

import '../semantic/dist/semantic.min.css'

const history = syncHistoryWithStore(browserHistory, store)
history.listen(() => {
  store.dispatch(resetErrorMessageIfNeeded())
})

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={ScreenshotsContainer} />
        <Route path="login" component={LoginContainer} />
        <Route path="upload" component={UploadContainer} onEnter={requireAuth} />
        <Route path="screenshot/:screenshotId" component={ScreenshotContainer} />
        <Route path="tag/:name" component={TagContainer} />
        <Route path="user/:userId" component={UserContainer}>
          <Route path="favorites" component={UserFavoritesContainer} />
          <Route path="uploads" component={UserUploadsContainer} />
        </Route>
        <Route path="*" component={ScreenshotsContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
