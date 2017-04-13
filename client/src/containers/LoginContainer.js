import React, { Component, PropTypes } from 'react'
import { Container, Segment, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Login from '../components/Login'
import Signup from '../components/Signup'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

class LoginContainer extends Component {

  render() {
    const size = 'large'
    const { dispatch, isFetching } = this.props

    return (
      <Container text>
        <Segment loading={isFetching}>
          <Grid divided stackable>
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

function mapStateToProps(state) {
  const { user } = state
  const { isFetching } = user

  return {
    isFetching
  }
}

LoginContainer.propTypes = propTypes

export default connect(mapStateToProps)(LoginContainer)
