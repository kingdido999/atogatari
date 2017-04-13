import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Filters from '../components/Filters'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  nsfw: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
}

class FiltersContainer extends Component {

  render() {
    const { showFilters } = this.props
    if (!showFilters) return null
    return <Filters { ...this.props } />
  }
}

function mapStateToProps(state) {
  const { environment, screenshots, routing } = state
  const { isMobile } = environment
  const { nsfw, sortBy, view } = screenshots
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions
  const showFilters = pathname === '/' 
  || pathname.match('/tag/') 
  || pathname.match('/favorites') 
  || pathname.match('/uploads')

  return {
    isMobile,
    nsfw,
    view,
    sortBy,
    showFilters
  }
}

FiltersContainer.propTypes = propTypes

export default connect(mapStateToProps)(FiltersContainer)