import React, { Component, PropTypes } from 'react'
import { Menu, Checkbox } from 'semantic-ui-react'

import { toggleNSFW, getScreenshots } from '../actions/entities'

class Filters extends Component {

  handleChangeNSFW = () => {
    const { dispatch, nsfw } = this.props
    dispatch(toggleNSFW())
    dispatch(getScreenshots({ nsfw: !nsfw }))
  }

  render() {
    const { nsfw } = this.props

    return (
      <Menu borderless>
        <Menu.Item>
          <Checkbox label={nsfw ? 'NSFW' : 'SAFE'} checked={nsfw} onChange={this.handleChangeNSFW} slider />
        </Menu.Item>
      </Menu>
    )
  }
}

Filters.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nsfw: PropTypes.bool.isRequired, 
}

export default Filters
