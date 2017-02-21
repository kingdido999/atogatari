import React, { Component, PropTypes } from 'react'
import { Message, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signup } from '../../actions/auth'

class Signup extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.dispatch(signup(this.state))
  }

  render() {
    const { errorMessage } = this.props

    return (

      <Form onSubmit={this.handleSubmit}>
        {errorMessage &&
          <Message negative content={errorMessage} />
        }

        <Form.Field>
          <label>Email</label>
          <input type="email" name="email" onChange={this.handleChange} />
        </Form.Field>

        <Form.Field>
          <label>Password</label>
          <input type="password" name="password" onChange={this.handleChange} />
        </Form.Field>

        <Form.Field>
          <label>Username</label>
          <input type="text" name="username" onChange={this.handleChange} />
        </Form.Field>

        <Form.Button type="submit">Submit</Form.Button>
      </Form>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

export default connect(mapStateToProps)(Signup)
