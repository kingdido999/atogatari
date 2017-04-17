import React, { Component, PropTypes } from 'react'
import { Menu, Checkbox } from 'semantic-ui-react'

import { 
  setSortBy, 
  toggleNSFW, 
  setView,
  firstPage,
  prevPage, 
  nextPage, 
  lastPage,
  getFilteredScreenshots 
} from '../actions/entities'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  nsfw: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
}

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

  handlePaginate = (action) => {
    const { dispatch } = this.props

    switch (action) {
      case 'first':
        dispatch(firstPage())
        break
      case 'prev':
        dispatch(prevPage())
        break
      case 'next':
        dispatch(nextPage())
        break
      case 'last':
        dispatch(lastPage())
        break
      default:
        return
    }

    dispatch(getFilteredScreenshots())
  }

  render() {
    const { isMobile, sortBy, nsfw, view, pages, page } = this.props
    const isFirstPage = page === 1
    const hasPrevPage = page > 1
    const hasNextPage = page < pages
    const isLastPage = page === pages

    return (
      <Menu attached='bottom' borderless>
        <Menu.Item name='recent' active={sortBy === 'date'} onClick={this.handleSortByDate} />
        <Menu.Item name='popular' active={sortBy === 'popularity'} onClick={this.handleSortByPopularity} />
        <Menu.Item>
          <Checkbox 
            label={nsfw ? 'Switch to SAFE' : 'Switch to NSFW'} 
            checked={nsfw} 
            onChange={this.handleChangeNSFW} 
            slider 
          />
        </Menu.Item>
        
        <Menu.Menu position='right'>
          <Menu.Item 
            icon='angle double left' 
            disabled={isFirstPage}
            onClick={() => this.handlePaginate('first')} 
          />
          <Menu.Item 
            icon='angle left' 
            disabled={!hasPrevPage}
            onClick={() => this.handlePaginate('prev')} 
          />
          <Menu.Item 
            icon='angle right' 
            disabled={!hasNextPage}
            onClick={() => this.handlePaginate('next')} 
          />
          <Menu.Item 
            icon='angle double right' 
            disabled={isLastPage}
            onClick={() => this.handlePaginate('last')} 
          />

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

Filters.propTypes = propTypes

export default Filters
