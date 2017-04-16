import React, { Component, PropTypes } from 'react'
import { Button } from 'semantic-ui-react'

class WhatAnimeGaIconButton extends Component {

  render () {
    const { url } = this.props

    return (
      <Button
        basic
        as='a'
        icon='play'
        target='_blank'
        href={`https://whatanime.ga/?url=${url}`}
      />
    )
  }
}

WhatAnimeGaIconButton.propTypes = {
  url: PropTypes.string.isRequired
}

export default WhatAnimeGaIconButton
