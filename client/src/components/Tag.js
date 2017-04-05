import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { deleteTag } from '../actions/user'

class Tag extends Component {

  handleClick = () => {
    const { tag } = this.props
    browserHistory.push(`/tag/${tag}`)
  }

  handleRemove = (event) => {
    event.stopPropagation()
    const { dispatch, tag, screenshotId } = this.props
    dispatch(deleteTag(tag, screenshotId))
  }

  render () {
    const { tag, isAdmin } = this.props

    if (isAdmin) {
      return (
        <Label
          as='a'
          content={tag}
          onClick={this.handleClick}
          onRemove={this.handleRemove}>
        </Label>
      )
    }

    return (
      <Label
        as='a'
        content={tag}
        onClick={this.handleClick}>
      </Label>
    )
  }
}

Tag.propTypes = {
  dispatch: PropTypes.func,
  tag: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  screenshotId: PropTypes.string,
}

export default Tag
