import React, { Component, PropTypes } from 'react'
import { Container, Segment, Grid, Header } from 'semantic-ui-react'

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  isSigningUp: PropTypes.bool.isRequired
}

class LoginPage extends Component {
  render() {
    const size = 'large'
    const { dispatch, isSigningUp, isLoggingIn } = this.props

    return (
      <Container text>
        <Segment>
          <Grid divided stackable>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment basic>
                  <Header size={size}>Sign Up</Header>
                  <SignupForm
                    size={size}
                    dispatch={dispatch}
                    loading={isSigningUp}
                  />
                </Segment>
              </Grid.Column>

              <Grid.Column>
                <Segment basic>
                  <Header size={size}>Log In</Header>
                  <LoginForm
                    size={size}
                    dispatch={dispatch}
                    loading={isLoggingIn}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

LoginPage.propTypes = propTypes

export default LoginPage
