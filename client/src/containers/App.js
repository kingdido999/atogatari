import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import { initEnvironment } from '../actions/environment'
import { getAuthedUserIfNeeded } from '../actions/user'

import NavContainer from './NavContainer'
import FiltersContainer from './FiltersContainer'
import ErrorMessageContainer from './ErrorMessageContainer'
import Footer from '../components/Footer'

import '../styles/app.css'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(initEnvironment())
    dispatch(getAuthedUserIfNeeded())
  }

  render() {
    return (
      <div className="App site">
        <NavContainer />
        <FiltersContainer />

        <Segment vertical className="site-content">
          <ErrorMessageContainer />

          {this.props.children}
          <br />
        </Segment>

        <Footer />

      </div>
    )
  }
}

export default connect()(App)
