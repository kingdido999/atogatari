import React, { Component, PropTypes } from 'react'
import { Segment, Header, Form } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { signup } from '../actions/user'

class Signup extends Component {

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

    dispatch(signup(this.state))
    .then(() => browserHistory.goBack())
  }

  render() {
    const { size } = this.props

    return (
      <Segment basic>
        <Header size={size}>Sign Up</Header>

        <Form
          size={size}
          onSubmit={this.handleSubmit}>

          <Form.Input 
            label='Username' 
            icon='user' 
            iconPosition='left' 
            name='username' 
            onChange={this.handleChange} 
          />

          <Form.Input 
            label='Email' 
            icon='mail' 
            iconPosition='left' 
            name='email'
            type='email'
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

          <Form.Button type="submit" size={size} fluid primary>Sign Up</Form.Button>
        </Form>
      </Segment>
    )
  }
}

Signup.propTypes = {
  size: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Signup
