import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { deleteTag } from '../actions/user'
import { TAG_TYPE_COLOR_MAP } from '../utils'

const propTypes = {
  dispatch: PropTypes.func,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number,
  isAdmin: PropTypes.bool,
  screenshotId: PropTypes.string
}

class Tag extends Component {
  handleClick = () => {
    const { name } = this.props
    browserHistory.push(`/tag/${name}`)
  }

  handleRemove = event => {
    event.stopPropagation()
    const { dispatch, name, screenshotId } = this.props
    dispatch(deleteTag(name, screenshotId))
  }

  render() {
    const { type, name, isAdmin, count } = this.props
    const color = TAG_TYPE_COLOR_MAP[type]

    if (isAdmin) {
      return (
        <Label
          as="a"
          color={color}
          content={name}
          detail={count}
          onClick={this.handleClick}
          onRemove={this.handleRemove}
        />
      )
    }

    return (
      <Label
        as="a"
        color={color}
        content={name}
        detail={count}
        onClick={this.handleClick}
      />
    )
  }
}

Tag.propTypes = propTypes

export default Tag
