import React, { Component, PropTypes } from 'react'
import { Container, Segment, Grid, Label } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotCards from './ScreenshotCards'
import TagTypesDropdown from './TagTypesDropdown'
import { TAG_TYPE_COLOR_MAP } from '../constants/tag'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tag: PropTypes.object,
  screenshotIds: PropTypes.array.isRequired,
  screenshots: PropTypes.object.isRequired
}

class TagPage extends Component {
  render() {
    const { dispatch, isAuthenticated, tag, screenshotIds } = this.props
    if (!tag) return null
    const { name, type } = tag
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <Container>
        <Segment>
          <Grid columns="equal">
            <Grid.Column>
              <Label
                size="large"
                color={TAG_TYPE_COLOR_MAP[tag.type]}
                content={tag.name}
                detail={screenshotIds.length}
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
          <ScreenshotCards zooming={zooming} {...this.props} />
        </Segment>
      </Container>
    )
  }
}

TagPage.propTypes = propTypes

export default TagPage
