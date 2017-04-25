import React, { Component, PropTypes } from 'react'
import { Popup, Button, Label } from 'semantic-ui-react'

import Tag from './Tag'
import AddTagDropdown from './AddTagDropdown'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tags: PropTypes.object.isRequired,
  tagNames: PropTypes.array.isRequired,
  screenshotId: PropTypes.string.isRequired
}

class TagsButton extends Component {
  render() {
    return (
      <Popup
        trigger={this.renderButton()}
        content={this.renderTags()}
        on="hover"
        position="bottom center"
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
    const {
      dispatch,
      isAuthenticated,
      tagNames,
      tags,
      screenshotId
    } = this.props

    return (
      <div>
        {tagNames.length > 0 &&
          <Label.Group>
            {tagNames.map((name, index) => (
              <Tag
                key={index}
                type={tags[name] ? tags[name].type : 'General'}
                name={name}
                count={tags[name] ? tags[name].screenshots.length : 1}
                dispatch={dispatch}
              />
            ))}
          </Label.Group>}

        {tagNames.length > 0 && isAuthenticated && <br />}

        {isAuthenticated &&
          <AddTagDropdown dispatch={dispatch} screenshotId={screenshotId} />}
      </div>
    )
  }
}

TagsButton.propTypes = propTypes

export default TagsButton
