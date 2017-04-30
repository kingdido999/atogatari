import React, { Component, PropTypes } from 'react'
import { Form } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { signup } from '../actions/entities'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
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
    const { size, loading } = this.props

    return (
      <Form size={size} onSubmit={this.handleSubmit}>

        <Form.Input
          icon="user"
          iconPosition="left"
          name="username"
          placeholder="Username"
          onChange={this.handleChange}
        />

        <Form.Input
          icon="mail"
          iconPosition="left"
          name="email"
          type="email"
          placeholder="Email"
          onChange={this.handleChange}
        />

        <Form.Input
          icon="lock"
          iconPosition="left"
          name="password"
          type="password"
          pattern=".{8,}"
          placeholder="Password (at least 8 characters)"
          onChange={this.handleChange}
          title="Your password length is less than 8"
        />

        <Form.Button type="submit" size={size} loading={loading} fluid primary>
          Sign Up
        </Form.Button>
      </Form>
    )
  }
}

SignupForm.propTypes = propTypes

export default SignupForm
