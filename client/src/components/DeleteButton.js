import React, { Component, PropTypes } from 'react'
import { Button, Popup } from 'semantic-ui-react'

import { deleteScreenshot } from '../actions/authed'
import { getFilteredScreenshots } from '../actions/entities'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  screenshotId: PropTypes.string.isRequired,
  onDelete: PropTypes.func
}

class DeleteButton extends Component {
  state = {
    isOpen: false
  }

  handleOpen = () => {
    this.setState({
      isOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    })
  }

  handleClick = () => {
    const { dispatch, screenshotId, onDelete } = this.props
    this.setState({
      isOpen: false
    })
    dispatch(deleteScreenshot(screenshotId)).then(() => {
      if (onDelete) onDelete()
      dispatch(getFilteredScreenshots({}, true))
    })
  }

  render() {
    return (
      <Popup
        trigger={<Button basic icon="trash" />}
        content={
          <Button
            icon="warning sign"
            labelPosition="left"
            content="Confirm Delete"
            color="red"
            onClick={this.handleClick}
          />
        }
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        on="click"
        position="bottom center"
      />
    )
  }
}

DeleteButton.propTypes = propTypes

export default DeleteButton
