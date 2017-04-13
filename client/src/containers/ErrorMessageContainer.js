import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ErrorMessage from '../components/ErrorMessage'

const propTypes = {
  errorMessage: PropTypes.string
}

class ErrorMessageContainer extends Component {

  render() {
    const { errorMessage } = this.props
    if (!errorMessage) return null

    return (
      <ErrorMessage content={errorMessage} />
    )
  }
}

function mapStateToProps(state) {
  const { errorMessage } = state

  return {
    errorMessage,
  }
}

ErrorMessageContainer.propTypes = propTypes

export default connect(mapStateToProps)(ErrorMessageContainer)
