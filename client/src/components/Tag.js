import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'

class Tag extends Component {

  handleDelete = (event) => {
    const { onDelete } = this.props
    onDelete()
  }

  render () {
    const { tag } = this.props

    return (
      <Label as='a'>
        {tag}
      </Label>
    )
  }
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired
}

export default Tag
