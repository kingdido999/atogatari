import React, { Component, PropTypes } from 'react'
import { Item, Search } from 'semantic-ui-react'
import { connect } from 'react-redux'

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
    const { isFetching, bangumis } = this.props
    const { search } = this.state

    return (
      <Search
        loading={isFetching}
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
  isFetching: PropTypes.bool.isRequired,
  bangumis: PropTypes.array.isRequired
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { bangumi } = state
  const { isFetching, bangumis } = bangumi

  return {
    isFetching,
    bangumis
  }
}

export default connect(mapStateToProps)(SearchBar)
