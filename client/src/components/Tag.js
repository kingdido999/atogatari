import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { deleteTagFromScreenshot } from '../actions/authed'
import { resetTagList, resetScreenshotLists } from '../actions/entities'
import { TAG_TYPE_COLOR_MAP } from '../constants/tag'

const propTypes = {
  dispatch: PropTypes.func,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number,
  isAdmin: PropTypes.bool,
  deletable: PropTypes.bool,
  screenshotId: PropTypes.string,
  horizontal: PropTypes.bool
}

class Tag extends Component {
  handleClick = () => {
    const { name } = this.props
    browserHistory.push(`/tag/${name}`)
  }

  handleRemove = event => {
    event.stopPropagation()
    const { dispatch, name, type, screenshotId } = this.props
    dispatch(deleteTagFromScreenshot(name, screenshotId))
    dispatch(resetTagList(type))
    dispatch(resetScreenshotLists())
  }

  render() {
    const {
      type,
      name,
      isAdmin,
      count,
      screenshotId,
      deletable,
      horizontal
    } = this.props
    const color = TAG_TYPE_COLOR_MAP[type]

    if (deletable && isAdmin && screenshotId) {
      return (
        <Label
          as="a"
          color={color}
          content={name}
          detail={count}
          onClick={this.handleClick}
          onRemove={this.handleRemove}
          horizontal={horizontal}
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
        horizontal={horizontal}
      />
    )
  }
}

Tag.propTypes = propTypes

export default Tag
