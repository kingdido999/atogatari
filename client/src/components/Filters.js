import React, { Component, PropTypes } from 'react'
import { Menu, Checkbox } from 'semantic-ui-react'

import { setSortBy, toggleNSFW, setView } from '../actions/entities'

class Filters extends Component {

  handleSortByDate = () => {
    const { dispatch } = this.props
    dispatch(setSortBy('date'))
  }

  handleSortByPopularity = () => {
    const { dispatch } = this.props
    dispatch(setSortBy('popularity'))
  }

  handleChangeNSFW = () => {
    const { dispatch } = this.props
    dispatch(toggleNSFW())
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
    const { isMobile, sortBy, nsfw, view } = this.props

    return (
      <Menu attached='bottom' borderless>
        <Menu.Item name='recent' active={sortBy === 'date'} onClick={this.handleSortByDate} />
        <Menu.Item name='popular' active={sortBy === 'popularity'} onClick={this.handleSortByPopularity} />
        
        <Menu.Menu position='right'>
          <Menu.Item>
            <Checkbox label={nsfw ? 'NSFW' : 'SAFE'} checked={nsfw} onChange={this.handleChangeNSFW} toggle />
          </Menu.Item>
          {!isMobile &&
            <Menu.Item icon='expand' active={view === 'single'} onClick={this.handleViewSingle} />
          }
          {!isMobile &&
            <Menu.Item icon='grid layout' active={view === 'grid'} onClick={this.handleViewGrid} />
          }
        </Menu.Menu>
      </Menu>
    )
  }
}

Filters.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  nsfw: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
}

export default Filters
