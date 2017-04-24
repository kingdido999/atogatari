import React, { Component, PropTypes } from 'react'
import { Button } from 'semantic-ui-react'

import { getImageUrl, downloadFromUrl } from '../utils'
import { downloadScreenshot } from '../actions/entities'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  screenshotId: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired
}

class DownloadButton extends Component {
  handleDownload = () => {
    const { dispatch, screenshotId, file } = this.props
    const originalUrl = getImageUrl(file.original)
    const filename = `Atogatari - ${file.original}`
    downloadFromUrl(originalUrl, filename)
    dispatch(downloadScreenshot(screenshotId))
  }

  render() {
    return <Button basic icon="download" onClick={this.handleDownload} />
  }
}

DownloadButton.propTypes = propTypes

export default DownloadButton
