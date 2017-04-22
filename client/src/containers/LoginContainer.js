import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginPage from '../components/LoginPage'

class LoginContainer extends Component {
	render() {
		return <LoginPage {...this.props} />
	}
}

function mapStateToProps(state) {
	const { user } = state
	const { isLoggingIn, isSigningUp } = user

	return {
		isLoggingIn,
		isSigningUp
	}
}

export default connect(mapStateToProps)(LoginContainer)
