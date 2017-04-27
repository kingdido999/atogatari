import React, { Component, PropTypes } from 'react'
import { Container, Segment, Grid } from 'semantic-ui-react'

import Tag from './Tag'
import ScreenshotCards from './ScreenshotCards'
import TagTypesDropdown from './TagTypesDropdown'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tags: PropTypes.object.isRequired,
  tag: PropTypes.object,
  screenshotIds: PropTypes.array.isRequired,
  screenshots: PropTypes.object.isRequired
}

class TagPage extends Component {
  render() {
    const { dispatch, isAuthenticated, tag } = this.props
    if (!tag) return null
    const { name, type, screenshots } = tag

    return (
      <Container>
        <Segment>
          <Grid columns="equal">
            <Grid.Column>
              <Tag
                dispatch={dispatch}
                type={type}
                name={name}
                count={screenshots.length}
              />
            </Grid.Column>

            <Grid.Column verticalAlign="middle" textAlign="right">
              <TagTypesDropdown
                dispatch={dispatch}
                isAuthenticated={isAuthenticated}
                name={name}
                type={type}
              />
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment basic vertical>
          <ScreenshotCards {...this.props} />
        </Segment>
      </Container>
    )
  }
}

TagPage.propTypes = propTypes

export default TagPage
