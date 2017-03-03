import React, { Component, PropTypes } from 'react'
import { Item, Search } from 'semantic-ui-react'

import { getBangumis } from '../actions/bangumi'

const resultRenderer = ({ title }) => (
  <Item>
    <Item.Content>
      <Item.Header>{ title }</Item.Header>
    </Item.Content>
  </Item>
)

class SearchBar extends Component {

  state = {
    search: ''
  }

  handleSearchChange = (e, value) => {
    this.setState({ search: value })
    this.props.dispatch(getBangumis(this.state))
  }

  render () {
    const { bangumis } = this.props
    const { search } = this.state

    return (
      <Search
        onSearchChange={this.handleSearchChange}
        results={bangumis}
        value={search}
        resultRenderer={resultRenderer}
      />
    )
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bangumis: PropTypes.array.isRequired
}

export default SearchBar
