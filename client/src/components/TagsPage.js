import React, { Component, PropTypes } from 'react'
import { Container, Grid } from 'semantic-ui-react'

import TagsTable from './TagsTable'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tagNames: PropTypes.array.isRequired,
  tags: PropTypes.object.isRequired
}

class TagsPage extends Component {
  render() {
    return (
      <Container>
        <Grid columns="equal" stackable>
          <Grid.Column>
            <TagsTable {...this.props} type="General" />
          </Grid.Column>
          <Grid.Column>
            <TagsTable {...this.props} type="Anime" />
          </Grid.Column>
          <Grid.Column>
            <TagsTable {...this.props} type="Character" />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

TagsPage.propTypes = propTypes

export default TagsPage
