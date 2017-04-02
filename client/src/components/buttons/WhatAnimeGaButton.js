import React, { Component, PropTypes } from 'react'
import { Button } from 'semantic-ui-react'

class WhatAnimeGaButton extends Component {

  render () {
    const { url } = this.props

    return (
      <Button
        basic
        as='a'
        icon='crosshairs'
        target='_blank'
        href={`https://whatanime.ga/?url=${url}`}
      />
    )
  }
}

WhatAnimeGaButton.propTypes = {
  url: PropTypes.string.isRequired
}

export default WhatAnimeGaButton
