import React, { Component, PropTypes } from 'react'
import { Label, List, Search } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import { search } from '../actions/entities'

const MIN_CHARACTERS = 3

const categoryRenderer = ({ name }) =>
  <Label as={'span'} content={name} />

function resultRenderer ({ title, aliases, name }) {
  if (title) {
    return (
      <List>
        <List.Item>{title}</List.Item>
          {aliases.map(alias =>
            <List.Item>{alias}</List.Item>
          )}
      </List>
    )
  }

  if (name) {
    return (
      <span>{name}</span>
    )
  }

  return null
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
    const { _id, title, name } = item

    if (title) {
      browserHistory.push(`/bangumi/${_id}`)
    } else if (name) {
      browserHistory.push(`/tag/${_id}`)
    } else {
      return
    }
  }

  render () {
    const { query } = this.state
    const { search } = this.props
    const { isFetching, results } = search
    const { bangumis, tags } = results

    const transformedResults = {}

    if (bangumis) {
      transformedResults.bangumis = {
        name: 'Bangumi',
        results: bangumis
      }
    }

    if (tags) {
      transformedResults.tags = {
        name: 'Tag',
        results: tags
      }
    }

    return (
      <Search
        category
        minCharacters={3}
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
