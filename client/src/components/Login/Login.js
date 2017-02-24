import React, { Component, PropTypes } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'

class Login extends Component {

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
    this.props.dispatch(login(this.state))
  }

  render() {

    const { size, isFetching } = this.props

    return (
      <Form
        size={size}
        loading={isFetching}
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
    )
  }
}

Login.propTypes = {
  size: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { auth } = state
  const { isFetching } = auth

  return {
    isFetching
  }
}

export default connect(mapStateToProps)(Login)
