import React, { Component, PropTypes } from 'react'
import { Button } from 'semantic-ui-react'

import { getImageUrl, downloadFromUrl } from '../../utils'

class FavoriteButton extends Component {

  handleDownload = () => {
    const { file } = this.props
    const originalUrl = getImageUrl(file.original)

    downloadFromUrl(originalUrl, file.original)
  }

  render () {
    return (
      <Button icon="download" onClick={this.handleDownload} />
    )
  }
}

FavoriteButton.propTypes = {
  file: PropTypes.object.isRequired
}

export default FavoriteButton
