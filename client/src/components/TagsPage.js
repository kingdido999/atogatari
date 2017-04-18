import React, { Component, PropTypes } from 'react'
import { Container, Table } from 'semantic-ui-react'
import { Link } from 'react-router'

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

  render() {
    const { tags, tagNames } = this.props

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
              <Table.Row key={index}>
                <Table.Cell collapsing>
                  {tags[name].screenshots.length}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/tag/${name}`}>{name}</Link>
                </Table.Cell>
                <Table.Cell>{tags[name].type}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

TagsPage.propTypes = propTypes

export default TagsPage
