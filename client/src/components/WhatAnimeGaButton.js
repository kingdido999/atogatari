import React, { Component, PropTypes } from 'react'
import { Button } from 'semantic-ui-react'

class WhatAnimeGaButton extends Component {

  render () {
    const { url } = this.props

    return (
      <Button
        fluid
        content='What Anime Is This?'
        icon='play'
        labelPosition='left'
        target='_blank'
        href={`https://trace.moe/?url=${url}`}
      />
    )
  }
}

WhatAnimeGaButton.propTypes = {
  url: PropTypes.string.isRequired
}

export default WhatAnimeGaButton

