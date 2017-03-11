import React, { Component, PropTypes } from 'react'
import { Input } from 'semantic-ui-react'

import { getBangumis } from '../actions/entities'

class SearchBar extends Component {

  state = {
    search: ''
  }

  handleSearchChange = (e, data) => {
    const { value } = data
    this.setState({ search: value })
    this.props.dispatch(getBangumis(this.state))
  }

  render () {
    const { isFetching } = this.props
    return (
      <Input
        fluid
        size='big'
        icon='search'
        placeholder='Search...'
        loading={isFetching}
        onChange={this.handleSearchChange}
      />
    )
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default SearchBar
