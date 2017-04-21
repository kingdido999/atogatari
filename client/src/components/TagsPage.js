import React, { Component, PropTypes } from 'react'
import { Container, Table } from 'semantic-ui-react'

import TagTableRow from './TagTableRow'
import { getTags } from '../actions/entities'

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

    return (
      <Container text>
        <Table celled striped unstackable compact>
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
