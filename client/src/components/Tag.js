import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'
import { Link } from 'react-router'

class Tag extends Component {

  handleDelete = (event) => {
    const { onDelete } = this.props
    onDelete()
  }

  render () {
    const { tag } = this.props

    return (
      <Label as={Link} to={`/tag/${tag}`}>
        {tag}
      </Label>
    )
  }
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired
}

export default Tag
