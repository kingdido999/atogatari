import React, { Component, PropTypes } from 'react'
import { Table } from 'semantic-ui-react'

import TagTableRow from './TagTableRow'
import { TAG_TYPE_COLOR_MAP } from '../utils'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tagNames: PropTypes.array.isRequired,
  tags: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}

class TagsTable extends Component {
  render() {
    const { dispatch, isAuthenticated, tags, tagNames, type } = this.props
    const filteredTagNames = tagNames.filter(name => {
      return tags[name].type === type
    })

    return (
      <Table color={TAG_TYPE_COLOR_MAP[type]} celled unstackable compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={3}>{type}</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredTagNames.map((name, index) => (
            <TagTableRow
              key={index}
              dispatch={dispatch}
              isAuthenticated={isAuthenticated}
              tag={tags[name]}
            />
          ))}
        </Table.Body>
      </Table>
    )
  }
}

TagsTable.propTypes = propTypes

export default TagsTable
