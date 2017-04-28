import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Button } from 'semantic-ui-react'

const propTypes = {
  screenshotId: PropTypes.string.isRequired
}

class DetailsButton extends Component {
  handleClick = () => {
    const { screenshotId } = this.props
    browserHistory.push(`/screenshot/${screenshotId}`)
  }

  render() {
    return <Button basic icon="ellipsis vertical" onClick={this.handleClick} />
  }
}

DetailsButton.propTypes = propTypes

export default DetailsButton
