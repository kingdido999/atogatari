import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { deleteTag } from '../actions/user'

class Tag extends Component {

  handleClick = () => {
    const { name } = this.props
    browserHistory.push(`/tag/${name}`)
  }

  handleRemove = (event) => {
    event.stopPropagation()
    const { dispatch, name, screenshotId } = this.props
    dispatch(deleteTag(name, screenshotId))
  }

  render () {
    const { name, isAdmin, count, color } = this.props

    if (isAdmin) {
      return (
        <Label
          as='a'
          color={color}
          content={name}
          detail={count}
          onClick={this.handleClick}
          onRemove={this.handleRemove}>
        </Label>
      )
    }

    return (
      <Label
        as='a'
        color={color}
        content={name}
        detail={count}
        onClick={this.handleClick}>
      </Label>
    )
  }
}

Tag.propTypes = {
  dispatch: PropTypes.func,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  count: PropTypes.number,
  isAdmin: PropTypes.bool,
  screenshotId: PropTypes.string,
}

export default Tag
