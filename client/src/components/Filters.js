import React, { Component, PropTypes } from 'react'
import { Menu, Dropdown, Checkbox } from 'semantic-ui-react'

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
  limit: PropTypes.number.isRequired
}

const generateOptions = text => {
  return {
    key: text,
    text: text,
    value: text,
    content: text
  }
}

const SORT_BY_OPTIONS = [
  generateOptions('Latest'),
  generateOptions('Most Popular'),
  generateOptions('Least Tags')
]

class Filters extends Component {
  handleChangeSortBy = (event, { value }) => {
    console.log(value)
    const { dispatch } = this.props
    dispatch(firstPage())
    dispatch(setSortBy(value))
    dispatch(getFilteredScreenshots())
  }

  handleChangeNSFW = () => {
    const { dispatch } = this.props
    dispatch(firstPage())
    dispatch(toggleNSFW())
    dispatch(getFilteredScreenshots())
  }

  handleChangeView = view => {
    const { dispatch } = this.props
    dispatch(setView(view))
  }

  handlePaginate = action => {
    const { dispatch, page, pages } = this.props

    switch (action) {
      case 'first':
        if (page !== 1) {
          dispatch(firstPage())
          dispatch(getFilteredScreenshots())
        }
        break
      case 'prev':
        if (page > 1) {
          dispatch(prevPage())
          dispatch(getFilteredScreenshots())
        }
        break
      case 'next':
        if (page < pages) {
          dispatch(nextPage())
          dispatch(getFilteredScreenshots())
        }
        break
      case 'last':
        if (page !== pages) {
          dispatch(lastPage())
          dispatch(getFilteredScreenshots())
        }
        break
      default:
        return
    }
  }

  render() {
    const { isMobile } = this.props

    if (isMobile) {
      return this.renderMobileFilters()
    } else {
      return this.renderFilters()
    }
  }

  renderFilters = () => {
    const { sortBy, nsfw, view, pages, page } = this.props
    const isFirstPage = page === 1
    const hasPrevPage = page > 1
    const hasNextPage = page < pages
    const isLastPage = page === pages

    return (
      <Menu attached="bottom" borderless>
        <Dropdown
          defaultValue={sortBy}
          options={SORT_BY_OPTIONS}
          onChange={this.handleChangeSortBy}
          item
          inline
        />

        <Menu.Item>
          <Checkbox
            label={nsfw ? 'Switch to SAFE' : 'Switch to NSFW'}
            checked={nsfw}
            onChange={this.handleChangeNSFW}
            slider
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            icon="angle double left"
            disabled={isFirstPage}
            onClick={() => this.handlePaginate('first')}
          />
          <Menu.Item
            icon="angle left"
            disabled={!hasPrevPage}
            onClick={() => this.handlePaginate('prev')}
          />
          <Menu.Item content={page} disabled />
          <Menu.Item
            icon="angle right"
            disabled={!hasNextPage}
            onClick={() => this.handlePaginate('next')}
          />
          <Menu.Item
            icon="angle double right"
            disabled={isLastPage}
            onClick={() => this.handlePaginate('last')}
          />

          <Menu.Item
            icon="expand"
            active={view === 'single'}
            onClick={() => this.handleChangeView('single')}
          />
          <Menu.Item
            icon="grid layout"
            active={view === 'grid'}
            onClick={() => this.handleChangeView('grid')}
          />
        </Menu.Menu>
      </Menu>
    )
  }

  renderMobileFilters = () => {
    const { sortBy, pages, page } = this.props
    const isFirstPage = page === 1
    const hasPrevPage = page > 1
    const hasNextPage = page < pages
    const isLastPage = page === pages

    return (
      <Menu attached="bottom" borderless>
        <Menu.Item
          name="latest"
          active={sortBy === 'date'}
          onClick={() => this.handleChangeSortBy('date')}
        />
        <Menu.Item
          name="popular"
          active={sortBy === 'popularity'}
          onClick={() => this.handleChangeSortBy('popularity')}
        />

        <Menu.Menu position="right">
          <Menu.Item
            icon="angle double left"
            disabled={isFirstPage}
            onClick={() => this.handlePaginate('first')}
          />
          <Menu.Item
            icon="angle left"
            disabled={!hasPrevPage}
            onClick={() => this.handlePaginate('prev')}
          />
          <Menu.Item content={page} disabled />
          <Menu.Item
            icon="angle right"
            disabled={!hasNextPage}
            onClick={() => this.handlePaginate('next')}
          />
          <Menu.Item
            icon="angle double right"
            disabled={isLastPage}
            onClick={() => this.handlePaginate('last')}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

Filters.propTypes = propTypes

export default Filters
