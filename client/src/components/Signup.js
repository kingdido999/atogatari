import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { signup } from '../actions/auth'

class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      username: ''
    }
  }

  handleInputChange = (event) => {
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
      <section className="container">
        <form>
          {errorMessage &&
          <p>{errorMessage}</p>
          }

          <label htmlFor="email">Email</label>
          <input type="email" name="email" className="u-full-width" id="email" onChange={this.handleInputChange} />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="u-full-width" id="password" onChange={this.handleInputChange} />

          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="u-full-width" id="username" onChange={this.handleInputChange} />

          <input className="button-primary" type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
      </section>
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
