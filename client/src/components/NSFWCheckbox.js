import React, { Component, PropTypes } from 'react'
import { Checkbox } from 'semantic-ui-react'

import { setScreenshotNSFW } from '../actions/authed'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  screenshotId: PropTypes.string.isRequired,
  nsfw: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

class NSFWCheckbox extends Component {
  handleChange = (event, { checked }) => {
    console.log(checked)
    const { dispatch, isAuthenticated, screenshotId } = this.props

    if (isAuthenticated) {
      dispatch(setScreenshotNSFW(screenshotId, checked))
    }
  }

  render() {
    const { isAuthenticated, nsfw } = this.props

    return (
      <Checkbox
        label="Not Safe For Work"
        checked={nsfw}
        disabled={!isAuthenticated}
        onChange={this.handleChange}
      />
    )
  }
}

NSFWCheckbox.propTypes = propTypes

export default NSFWCheckbox
