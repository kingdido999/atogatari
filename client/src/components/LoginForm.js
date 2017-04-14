import React, { Component, PropTypes } from 'react'
import { Form } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { login } from '../actions/user'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
}

class LoginForm extends Component {

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
    .then(() => browserHistory.goBack())
  }

  render() {
    const { size } = this.props

    return (
      <Form
        size={size}
        onSubmit={this.handleSubmit}>

        <Form.Input 
          label='Email or username' 
          icon='user'
          iconPosition='left' 
          name='email'
          onChange={this.handleChange} 
        />

        <Form.Input 
          label='Password' 
          icon='lock' 
          iconPosition='left' 
          name='password'
          type='password'
          onChange={this.handleChange} 
        />

        <Form.Button type="submit" size={size} fluid primary>Log In</Form.Button>
      </Form>
    )
  }
}

LoginForm.propTypes = propTypes

export default LoginForm
