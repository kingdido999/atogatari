import React, { Component, PropTypes } from 'react'
import { Menu, Checkbox } from 'semantic-ui-react'

import { setSortBy, toggleNSFW, setView, getScreenshots } from '../actions/entities'

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

  handleViewSingle = () => {
    const { dispatch } = this.props 
    dispatch(setView('single'))
  }

  handleViewGrid = () => {
    const { dispatch } = this.props
    dispatch(setView('grid'))
  }

  render() {
    const { sortBy, nsfw, view } = this.props

    return (
      <Menu attached='bottom' borderless>
        <Menu.Item name='recent' active={sortBy === 'date'} onClick={this.handleSortByDate} />
        <Menu.Item name='popular' active={sortBy === 'popularity'} onClick={this.handleSortByPopularity} />
        <Menu.Item>
          <Checkbox label={nsfw ? 'NSFW' : 'SAFE'} checked={nsfw} onChange={this.handleChangeNSFW} toggle />
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item icon='expand' active={view === 'single'} onClick={this.handleViewSingle} />
          <Menu.Item icon='grid layout' active={view === 'grid'} onClick={this.handleViewGrid} />
        </Menu.Menu>
      </Menu>
    )
  }
}

Filters.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  nsfw: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
}

export default Filters
