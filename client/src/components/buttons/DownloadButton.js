import React, { Component, PropTypes } from 'react'
import { Button } from 'semantic-ui-react'

import { getImageUrl, downloadFromUrl } from '../../utils'

class DownloadButton extends Component {

  handleDownload = () => {
    const { file } = this.props
    const originalUrl = getImageUrl(file.original)

    downloadFromUrl(originalUrl, file.original)
  }

  render () {
    return (
      <Button
        basic
        icon="download"
        onClick={this.handleDownload}
      />
    )
  }
}

DownloadButton.propTypes = {
  file: PropTypes.object.isRequired
}

export default DownloadButton
