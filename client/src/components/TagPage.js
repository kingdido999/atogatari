import React, { Component, PropTypes } from 'react'
import { Container, Segment, Menu, Icon } from 'semantic-ui-react'
import Zooming from 'zooming'

import FiltersContainer from '../containers/FiltersContainer'
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
    const { name, type } = tag
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <Container>
        <Menu borderless>
          <Menu.Item header disabled>
            <Icon name="tag" />
            {name.toUpperCase()}
          </Menu.Item>
          <Menu.Item>
            <TagTypesDropdown
              dispatch={dispatch}
              isAuthenticated={isAuthenticated}
              name={name}
              type={type}
            />
          </Menu.Item>

          <FiltersContainer />
        </Menu>

        <Segment vertical basic>
          <ScreenshotCards {...this.props} zooming={zooming} />
        </Segment>
      </Container>
    )
  }
}

TagPage.propTypes = propTypes

export default TagPage
