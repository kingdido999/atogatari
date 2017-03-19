import React, { Component, PropTypes } from 'react'
import { Segment, Header, Form } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { login } from '../actions/user'

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    const target = event.target
    const { value, name } = target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { dispatch } = this.props

    dispatch(login(this.state))
    .then(() => browserHistory.push('/'))
  }

  render() {
    const { size } = this.props

    return (
      <Segment basic>
        <Header size={size}>Log In</Header>
        <Form
          size={size}
          onSubmit={this.handleSubmit}>

          <Form.Field>
            <label>Email</label>
            <input type="email" name="email" onChange={this.handleChange} />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input type="password" name="password" onChange={this.handleChange} />
          </Form.Field>

          <Form.Button type="submit" size={size} fluid primary>Log In</Form.Button>
        </Form>
      </Segment>
    )
  }
}

Login.propTypes = {
  size: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Login
