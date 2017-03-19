import React, { Component, PropTypes } from 'react'
import { Input } from 'semantic-ui-react'

import { getBangumis } from '../actions/entities'

class SearchBar extends Component {

  state = {
    search: ''
  }

  handleSearchChange = (e, data) => {
    const { dispatch } = this.props
    const { value } = data
    this.setState({ search: value })

    dispatch(getBangumis(this.state))
  }

  render () {
    return (
      <Input
        fluid
        size='big'
        icon='search'
        placeholder='Search...'
        onChange={this.handleSearchChange}
      />
    )
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default SearchBar
