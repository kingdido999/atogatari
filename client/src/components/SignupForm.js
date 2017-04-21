import React, { Component, PropTypes } from 'react'
import { Form } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { signup } from '../actions/user'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired
}

class SignupForm extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    const target = event.target
    const { value, name } = target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch } = this.props

    dispatch(signup(this.state)).then(() => browserHistory.goBack())
  }

  render() {
    const { size } = this.props

    return (
      <Form size={size} onSubmit={this.handleSubmit}>

        <Form.Input
          label="Username"
          icon="user"
          iconPosition="left"
          name="username"
          onChange={this.handleChange}
        />

        <Form.Input
          label="Email"
          icon="mail"
          iconPosition="left"
          name="email"
          type="email"
          onChange={this.handleChange}
        />

        <Form.Input
          label="Password"
          icon="lock"
          iconPosition="left"
          name="password"
          type="password"
          pattern=".{8,}"
          placeholder="At least 8 characters"
          onChange={this.handleChange}
          title="Your password length is less than 8"
        />

        <Form.Button type="submit" size={size} fluid primary>
          Sign Up
        </Form.Button>
      </Form>
    )
  }
}

SignupForm.propTypes = propTypes

export default SignupForm
