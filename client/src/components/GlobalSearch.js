import React, { Component, PropTypes } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import Tag from './Tag'
import { search, setQuery, clearSearch } from '../actions/entities'
import { MIN_CHARACTERS, DONE_TYPING_INTERVAL } from '../constants/search'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
}

const resultRenderer = ({ name, type, screenshots }) => {
  return (
    <Grid>
      <Grid.Column floated="left" width={12}>
        <Tag name={name} type={type} />
      </Grid.Column>
      <Grid.Column floated="right" width={4} textAlign="right">
        <small className="text grey">{screenshots.length}</small>
      </Grid.Column>
    </Grid>
  )
}

class GlobalSearch extends Component {
  state = {
    typingTimer: null
  }

  handleSearchChange = (e, value) => {
    clearTimeout(this.state.typingTimer)
    this.setState({
      typingTimer: setTimeout(
        () => this.handleDoneTyping(value.trim()),
        DONE_TYPING_INTERVAL
      )
    })
    const { dispatch } = this.props
    dispatch(setQuery(value))
  }

  handleDoneTyping = value => {
    if (value.length < MIN_CHARACTERS) return
    const { dispatch } = this.props
    dispatch(search({ query: value }))
  }

  handleResultSelect = (e, item) => {
    const { dispatch } = this.props
    const { name } = item
    dispatch(clearSearch())
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
