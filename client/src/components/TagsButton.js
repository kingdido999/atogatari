import React, { Component, PropTypes } from 'react'
import { Popup, Button, Divider } from 'semantic-ui-react'

import Tags from './Tags'
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
    const { dispatch, isAuthenticated, tagNames, screenshotId } = this.props

    return (
      <div>
        <Tags {...this.props} />

        {tagNames.length > 0 && isAuthenticated && <Divider />}

        {isAuthenticated &&
          <AddTagDropdown dispatch={dispatch} screenshotId={screenshotId} />}
      </div>
    )
  }
}

TagsButton.propTypes = propTypes

export default TagsButton
