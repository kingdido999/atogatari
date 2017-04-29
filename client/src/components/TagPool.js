import React, { Component, PropTypes } from 'react'
import { Segment, Card, Divider } from 'semantic-ui-react'

import TagCard from './TagCard'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tagNames: PropTypes.array.isRequired,
  tags: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired
}

class TagPool extends Component {
  render() {
    const {
      dispatch,
      isAuthenticated,
      tags,
      tagNames,
      type,
      itemsPerRow
    } = this.props
    if (tagNames.length === 0) return null

    const filteredTagNames = tagNames.filter(name => {
      return tags[name].type === type
    })

    return (
      <Segment basic vertical>
        <Divider section horizontal>
          {type} +{filteredTagNames.length}
        </Divider>

        <Card.Group itemsPerRow={itemsPerRow}>
          {filteredTagNames.map((name, index) => (
            <TagCard
              key={index}
              dispatch={dispatch}
              isAuthenticated={isAuthenticated}
              tag={tags[name]}
            />
          ))}
        </Card.Group>
      </Segment>
    )
  }
}

TagPool.propTypes = propTypes

export default TagPool
