import React, { Component, PropTypes } from 'react'
import { Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { deleteScreenshot } from '../../actions/user'

class DeleteButton extends Component {

  handleClick = () => {
    const { dispatch, screenshotId } = this.props
    dispatch(deleteScreenshot(screenshotId))
    .then(() => {
      browserHistory.goBack()
    })
  }

  render () {
    return (
      <Button
        basic
        icon="trash"
        onClick={this.handleClick}
      />
    )
  }
}

DeleteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  screenshotId: PropTypes.string.isRequired
}

export default DeleteButton
