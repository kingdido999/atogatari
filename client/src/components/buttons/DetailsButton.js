import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Button } from 'semantic-ui-react'

class DetailsButton extends Component {

  handleClick = () => {
    const { screenshotId } = this.props
    browserHistory.push(`/screenshot/${screenshotId}`)
  }

  render () {
    return (
      <Button
        basic
        icon='maximize'
        onClick={this.handleClick}
      />
    )
  }
}

DetailsButton.propTypes = {
  screenshotId: PropTypes.string.isRequired,
}

export default DetailsButton
