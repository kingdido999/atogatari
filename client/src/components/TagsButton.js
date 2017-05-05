import React, { Component, PropTypes } from 'react'
import { Popup, Button } from 'semantic-ui-react'

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
    const { tagNames, isAuthenticated } = this.props
    if (!isAuthenticated && tagNames.length === 0) return null

    return (
      <Popup
        trigger={this.renderButton()}
        content={this.renderTags()}
        on="hover"
        position="bottom left"
        hoverable
      />
    )
  }

  renderButton = () => {
    return <Button basic icon="tags" />
  }

  renderTags = () => {
    const { dispatch, isAuthenticated, tagNames, screenshotId } = this.props

    return (
      <div>
        {tagNames.length > 0 && <Tags {...this.props} />}

        {isAuthenticated &&
          <AddTagDropdown dispatch={dispatch} screenshotId={screenshotId} />}
      </div>
    )
  }
}

TagsButton.propTypes = propTypes

export default TagsButton
