import React, { Component, PropTypes } from 'react'
import { Grid, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Login from '../Login'
import Signup from '../Signup'

class LoginAndSignup extends Component {

  render() {
    const size = 'huge'
    const { errorMessage } = this.props

    return (

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
            <Signup size={size} />
          </Grid.Column>
          <Grid.Column>
            <Login size={size} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

LoginAndSignup.propTypes = {
  errorMessage: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { auth } = state
  const { errorMessage } = auth

  return {
    errorMessage
  }
}

export default connect(mapStateToProps)(LoginAndSignup)
