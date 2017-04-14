import React, { Component } from 'react'
import { connect } from 'react-redux'

import ErrorMessage from '../components/ErrorMessage'

class ErrorMessageContainer extends Component {

  render() {
    const { errorMessage } = this.props
    if (!errorMessage) return null

    return <ErrorMessage content={errorMessage} />
  }
}

function mapStateToProps(state) {
  const { errorMessage } = state

  return {
    errorMessage,
  }
}

export default connect(mapStateToProps)(ErrorMessageContainer)
