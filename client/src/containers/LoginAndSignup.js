import React, { Component, PropTypes } from 'react'
import { Container, Segment, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Login from '../components/Login'
import Signup from '../components/Signup'

class LoginAndSignup extends Component {

  render() {
    const size = 'large'
    const { dispatch, isFetching } = this.props

    return (
      <Container text>
        <Segment basic loading={isFetching}>
          <Grid columns={2} divided>
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
      </Container>
    )
  }
}

LoginAndSignup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { auth } = state
  const { isFetching } = auth

  return {
    isFetching
  }
}

export default connect(mapStateToProps)(LoginAndSignup)
