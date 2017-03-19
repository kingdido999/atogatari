import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Button } from 'semantic-ui-react'

class DetailsButton extends Component {

  handleClick = () => {
    const { screenshotId } = this.props
    browserHistory.push(`/screenshot/${screenshotId}`)
  }

  render () {
    const { floated } = this.props

    return (
      <Button
        content='More'
        onClick={this.handleClick}
        floated={floated}
      />
    )
  }
}

DetailsButton.propTypes = {
  screenshotId: PropTypes.string.isRequired,
  floated: PropTypes.string
}

export default DetailsButton
