import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'
import Signup from './components/Signup'
import Login from './components/Login'
import Upload from './components/Upload'


const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/upload" component={Upload}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
