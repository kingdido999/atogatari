import React, { Component, PropTypes } from 'react'
import { Container } from 'semantic-ui-react'

import TagPool from './TagPool'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tagNames: PropTypes.array.isRequired,
  tags: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired
}

class TagsPage extends Component {
  render() {
    return (
      <Container>
        <TagPool {...this.props} />
      </Container>
    )
  }
}

TagsPage.propTypes = propTypes

export default TagsPage
