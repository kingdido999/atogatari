import React, { Component, PropTypes } from 'react'
import { Item, Search } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { getBangumis } from '../actions/entities'

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

  handleResultSelect = (e, item) => {
    browserHistory.push(`/bangumi/${item._id}`)
  }

  render () {
    const { bangumis } = this.props
    const { search } = this.state

    return (
      <Search
        onSearchChange={this.handleSearchChange}
        onResultSelect={this.handleResultSelect}
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
