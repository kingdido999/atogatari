import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'

class Tag extends Component {

  render () {
    const { tag } = this.props

    return (
      <Label>{tag}</Label>
    )
  }
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
}

export default Tag
