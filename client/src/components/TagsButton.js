import React, { Component, PropTypes } from 'react'
import { Popup, Button, Label } from 'semantic-ui-react'

import Tag from './Tag'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  tags: PropTypes.object.isRequired,
  tagNames: PropTypes.array.isRequired
}

class TagsButton extends Component {
  render() {
    return (
      <Popup
        trigger={this.renderButton()}
        content={this.renderTags()}
        on="hover"
        position="bottom center"
        flowing
        hoverable
      />
    )
  }

  renderButton = () => {
    const { tagNames } = this.props
    return (
      <Button
        basic
        icon="tags"
        content={tagNames.length > 0 ? tagNames.length : null}
      />
    )
  }

  renderTags = () => {
    const { dispatch, tagNames, tags } = this.props

    if (tagNames.length === 0) {
      return 'No tags yet...'
    }

    return (
      <Label.Group>
        {tagNames.map((name, index) => (
          <Tag
            key={index}
            type={tags[name] ? tags[name].type : 'General'}
            name={name}
            count={tags[name] ? tags[name].screenshots.length : null}
            dispatch={dispatch}
          />
        ))}
      </Label.Group>
    )
  }
}

TagsButton.propTypes = propTypes

export default TagsButton
