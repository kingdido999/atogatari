import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import React from 'react'

import { requireAuth } from './utils'
import { logPageView } from './ga'
import store from './store'
import history from './history'

import App from './containers/App'
import ScreenshotsContainer from './containers/ScreenshotsContainer'
import LoginContainer from './containers/LoginContainer'
import UploadContainer from './containers/UploadContainer'
import ScreenshotContainer from './containers/ScreenshotContainer'
import TagContainer from './containers/TagContainer'
import TagsContainer from './containers/TagsContainer'
import UserContainer from './containers/UserContainer'
import UserFavoritesContainer from './containers/UserFavoritesContainer'
import UserUploadsContainer from './containers/UserUploadsContainer'

import '../semantic/dist/semantic.min.css'

render(
  <Provider store={store}>
    <Router history={history} onUpdate={logPageView}>
      <Route path="/" component={App}>
        <IndexRoute component={ScreenshotsContainer} />
        <Route path="screenshots" component={ScreenshotsContainer} />
        <Route path="tags" component={TagsContainer} />
        <Route
          path="screenshot/:screenshotId"
          component={ScreenshotContainer}
        />
        <Route path="tag/:name" component={TagContainer} />
        <Route path="login" component={LoginContainer} />
        <Route
          path="upload"
          component={UploadContainer}
          onEnter={requireAuth}
        />
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
