import React, { Component, PropTypes } from 'react'
import { Segment, Grid, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Login from '../components/Login'
import Signup from '../components/Signup'

class LoginAndSignup extends Component {

  render() {
    const size = 'large'
    const { dispatch, isFetching, errorMessage } = this.props

    return (
      <Segment basic loading={isFetching}>
        <Grid columns={2} divided>

          <Grid.Row columns={1}>
            <Grid.Column>
              {errorMessage &&
                <Message error content={errorMessage} />
              }
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Signup size={size} dispatch={dispatch}/>
            </Grid.Column>
            <Grid.Column>
              <Login size={size} dispatch={dispatch} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

LoginAndSignup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { auth } = state
  const { isFetching, errorMessage } = auth

  return {
    isFetching,
    errorMessage
  }
}

export default connect(mapStateToProps)(LoginAndSignup)
