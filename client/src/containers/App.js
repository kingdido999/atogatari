import React, { Component, PropTypes } from 'react'
import { Segment, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { getAuthedUserIfNeeded } from '../actions/user'

import Header from '../components/Header'
import Footer from '../components/Footer'

import '../styles/app.css'

class App extends Component {

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getAuthedUserIfNeeded())
  }

  render() {
    const { errorMessage } = this.props

    return (
      <div className="App site">
        <Header
          { ...this.props }
        />

        <Segment vertical className="site-content">
          {errorMessage &&
            <Segment basic>
              <Container text>
                <Message error content={errorMessage} />
              </Container>
            </Segment>
          }

          {this.props.children}
        </Segment>

        <Segment vertical>
          <Footer />
        </Segment>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  search: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { user, errorMessage, search } = state
  const { isAuthenticated, uid } = user

  return {
    isAuthenticated,
    uid,
    errorMessage,
    search
  }
}

export default connect(mapStateToProps)(App)
