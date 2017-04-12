import React, { Component, PropTypes } from 'react'
import { Menu, Checkbox } from 'semantic-ui-react'

import { setSortBy, toggleNSFW, getScreenshots } from '../actions/entities'

class Filters extends Component {

  handleSortByDate = () => {
    const { dispatch, nsfw } = this.props
    dispatch(setSortBy('date'))
    dispatch(getScreenshots({ nsfw, sortBy: 'date' }))
  }

  handleSortByPopularity = () => {
    const { dispatch, nsfw } = this.props
    dispatch(setSortBy('popularity'))
    dispatch(getScreenshots({ nsfw, sortBy: 'popularity' }))
  }

  handleChangeNSFW = () => {
    const { dispatch, nsfw, sortBy } = this.props
    dispatch(toggleNSFW())
    dispatch(getScreenshots({ nsfw: !nsfw, sortBy }))
  }

  render() {
    const { sortBy, nsfw } = this.props

    return (
      <Menu attached='bottom' stackable borderless>
        <Menu.Item name='mostRecent' active={sortBy === 'date'} onClick={this.handleSortByDate} />
        <Menu.Item name='mostPopular' active={sortBy === 'popularity'} onClick={this.handleSortByPopularity} />
        <Menu.Item>
          <Checkbox label={nsfw ? 'NSFW' : 'SAFE'} checked={nsfw} onChange={this.handleChangeNSFW} slider />
        </Menu.Item>
      </Menu>
    )
  }
}

Filters.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  nsfw: PropTypes.bool.isRequired,
}

export default Filters
