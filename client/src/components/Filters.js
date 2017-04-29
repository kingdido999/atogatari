import React, { Component, PropTypes } from 'react'
import { Menu, Dropdown, Checkbox } from 'semantic-ui-react'

import { SORT_BY } from '../constants/filter'

import {
  setSortBy,
  toggleNSFW,
  setView,
  setPage,
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
  generateOptions(SORT_BY.LATEST),
  generateOptions(SORT_BY.MOST_POPULAR),
  generateOptions(SORT_BY.LEAST_TAGS)
]

class Filters extends Component {
  handleChangeSortBy = (event, { value }) => {
    const { dispatch } = this.props
    dispatch(setPage(1))
    dispatch(setSortBy(value))
    dispatch(getFilteredScreenshots({ sortBy: value }))
  }

  handleChangeNSFW = () => {
    const { dispatch, nsfw } = this.props
    dispatch(setPage(1))
    dispatch(toggleNSFW())
    dispatch(getFilteredScreenshots({ nsfw: !nsfw }))
  }

  handleRefresh = () => {
    const { dispatch } = this.props
    dispatch(getFilteredScreenshots({}, true))
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
          dispatch(setPage(1))
          dispatch(getFilteredScreenshots({ page: 1 }))
        }
        break
      case 'prev':
        if (page > 1) {
          dispatch(setPage(page - 1))
          dispatch(getFilteredScreenshots({ page: page - 1 }))
        }
        break
      case 'next':
        if (page < pages) {
          dispatch(setPage(page + 1))
          dispatch(getFilteredScreenshots({ page: page + 1 }))
        }
        break
      case 'last':
        if (page !== pages) {
          dispatch(setPage(pages))
          dispatch(getFilteredScreenshots({ page: pages }))
        }
        break
      default:
        return
    }
  }

  render() {
    const { isMobile } = this.props
    const filters = isMobile ? this.renderMobileFilters() : this.renderFilters()
    return filters
  }

  renderFilters = () => {
    const { sortBy, nsfw, view, pages, page, total } = this.props
    const isFirstPage = page === 1
    const hasPrevPage = page > 1
    const hasNextPage = page < pages
    const isLastPage = page === pages

    return (
      <Menu.Menu position="right">
        {total > 0 && <Menu.Item content={`${total} results`} disabled />}

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
        <Dropdown
          defaultValue={sortBy}
          options={SORT_BY_OPTIONS}
          onChange={this.handleChangeSortBy}
          item
          upward
        />

        <Menu.Item>
          <Checkbox
            label="NSFW"
            checked={nsfw}
            onChange={this.handleChangeNSFW}
          />
        </Menu.Item>

        <Menu.Item icon="refresh" onClick={this.handleRefresh} />

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
    )
  }

  renderMobileFilters = () => {
    const { pages, page } = this.props
    const hasPrevPage = page > 1
    const hasNextPage = page < pages

    return (
      <Menu.Menu position="right">
        <Menu.Item
          icon="angle left"
          disabled={!hasPrevPage}
          onClick={() => this.handlePaginate('prev')}
        />
        <Menu.Item
          icon="angle right"
          disabled={!hasNextPage}
          onClick={() => this.handlePaginate('next')}
        />
      </Menu.Menu>
    )
  }
}

Filters.propTypes = propTypes

export default Filters
