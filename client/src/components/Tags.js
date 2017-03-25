import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'

import Tag from './Tag'

class Tags extends Component {

  render () {
    const { tags } = this.props

    if (tags.length === 0) return null

    return (
      <Label.Group>
        {tags.map((tag, index) =>
          <Tag key={index} tag={tag} />
        )}
      </Label.Group>
    )
  }
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
}

export default Tags
