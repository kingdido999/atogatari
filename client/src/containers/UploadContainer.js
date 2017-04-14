import React, { Component } from 'react'
import { connect } from 'react-redux'

import UploadPage from '../components/UploadPage'

class UploadContainer extends Component {

  render() {
    return <UploadPage { ...this.props } />
  }
}

function mapStateToProps(state) {
  const { user } = state
  const { isUploading } = user

  return {
    isUploading
  }
}

export default connect(mapStateToProps)(UploadContainer)
