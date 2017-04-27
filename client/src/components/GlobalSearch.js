import React, { Component, PropTypes } from 'react'
import { Search, Grid, Label } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import Tag from './Tag'
import { search, setQuery } from '../actions/entities'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
}

const MIN_CHARACTERS = 1

const resultRenderer = ({ name, type, screenshots }) => {
  return (
    <Grid>
      <Grid.Column floated="left">
        <Tag name={name} type={type} />
      </Grid.Column>
      <Grid.Column floated="right" width={3}>
        <Label circular content={screenshots.length} />
      </Grid.Column>
    </Grid>
  )
}

class GlobalSearch extends Component {
  handleSearchChange = (e, value) => {
    const { dispatch } = this.props
    dispatch(setQuery(value))
    if (value.length < MIN_CHARACTERS) return
    dispatch(search({ query: value }))
  }

  handleResultSelect = (e, item) => {
    const { name } = item
    browserHistory.push(`/tag/${name}`)
  }

  render() {
    const { search } = this.props
    const { query, results } = search

    return (
      <Search
        minCharacters={MIN_CHARACTERS}
        onSearchChange={this.handleSearchChange}
        onResultSelect={this.handleResultSelect}
        resultRenderer={resultRenderer}
        results={results}
        value={query}
      />
    )
  }
}

GlobalSearch.propTypes = propTypes

export default GlobalSearch
