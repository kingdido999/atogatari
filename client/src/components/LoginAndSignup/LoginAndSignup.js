import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import Login from '../Login'
import Signup from '../Signup'

class LoginAndSignup extends Component {

  render() {
    const size = 'huge'

    return (
      <Grid columns={2} divided>
        <Grid.Row>
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

export default LoginAndSignup
