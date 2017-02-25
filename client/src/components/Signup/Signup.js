import React, { Component, PropTypes } from 'react'
import { Segment, Header, Form } from 'semantic-ui-react'
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
    const { size } = this.props

    return (
      <Segment basic>
        <Header size={size}>Sign Up for a Free Account</Header>

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

          <Form.Field>
            <label>Username</label>
            <input type="text" name="username" onChange={this.handleChange} />
          </Form.Field>

          <Form.Button type="submit" size={size} fluid primary>Create Account</Form.Button>
        </Form>
      </Segment>
    )
  }
}

Signup.propTypes = {
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

export default connect(mapStateToProps)(Signup)
