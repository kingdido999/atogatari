import React, { Component, PropTypes } from 'react'
import { Container, Table } from 'semantic-ui-react'

import { getTags } from '../actions/entities'
import TagTableRow from './TagTableRow'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tagNames: PropTypes.array.isRequired,
  tags: PropTypes.object.isRequired
}

class TagsPage extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getTags())
  }

  handleChangeType = (event, data) => {
    console.log(data)
  }

  render() {
    const { dispatch, isAuthenticated, tags, tagNames } = this.props
    const types = [
      {
        text: 'General',
        value: 'General',
        label: { color: null, empty: true, circular: true }
      },
      {
        text: 'Anime',
        value: 'Anime',
        label: { color: 'blue', empty: true, circular: true }
      },
      {
        text: 'Character',
        value: 'Character',
        label: { color: 'teal', empty: true, circular: true }
      }
    ]

    return (
      <Container text>
        <Table celled striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Screenshots</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tagNames.map((name, index) => (
              <TagTableRow
                key={index}
                dispatch={dispatch}
                isAuthenticated={isAuthenticated}
                tag={tags[name]}
                types={types}
              />
            ))}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

TagsPage.propTypes = propTypes

export default TagsPage
