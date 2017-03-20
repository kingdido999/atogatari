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

class GlobalSearch extends Component {

  state = {
    search: ''
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: '' })
  }

  handleSearchChange = (e, value) => {
    const { dispatch } = this.props
    this.setState({ search: value })
    dispatch(getBangumis(this.state))
  }

  handleResultSelect = (e, item) => {
    browserHistory.push(`/bangumi/${item._id}`)
  }

  render () {
    const { results } = this.props
    const { search } = this.state

    return (
      <Search
        onSearchChange={this.handleSearchChange}
        onResultSelect={this.handleResultSelect}
        results={results}
        value={search}
        resultRenderer={resultRenderer}
      />
    )
  }
}

GlobalSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired
}

export default GlobalSearch
