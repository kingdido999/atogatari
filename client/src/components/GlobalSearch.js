import React, { Component, PropTypes } from 'react'
import { Label, Search } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { search } from '../actions/entities'

const MIN_CHARACTERS = 1

const categoryRenderer = ({ name }) =>
  <Label as={'span'} content={name} />

function resultRenderer ({ name }) {
  return (
    <span>{name}</span>
  )
}

class GlobalSearch extends Component {

  state = {
    query: ''
  }

  handleSearchChange = (e, value) => {
    this.setState({ query: value }, () => {
      if (value.length < MIN_CHARACTERS) return

      const { dispatch } = this.props
      dispatch(search(this.state))
    })
  }

  handleResultSelect = (e, item) => {
    const { name } = item
    browserHistory.push(`/tag/${name}`)
  }

  render () {
    const { query } = this.state
    const { search } = this.props
    const { isFetching, results } = search
    const { tags } = results

    const transformedResults = {}

    if (tags) {
      transformedResults.tags = {
        name: 'Tag',
        results: tags
      }
    }

    return (
      <Search
        category
        minCharacters={MIN_CHARACTERS}
        loading={isFetching}
        onSearchChange={this.handleSearchChange}
        onResultSelect={this.handleResultSelect}
        categoryRenderer={categoryRenderer}
        resultRenderer={resultRenderer}
        results={transformedResults}
        value={query}
      />
    )
  }
}

GlobalSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
}

export default GlobalSearch
