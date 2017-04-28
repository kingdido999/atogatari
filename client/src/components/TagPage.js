import React, { Component, PropTypes } from 'react'
import { Container, Segment, Menu } from 'semantic-ui-react'
import Zooming from 'zooming'

import FiltersContainer from '../containers/FiltersContainer'
import ScreenshotCards from './ScreenshotCards'
import TagTypesDropdown from './TagTypesDropdown'
import { TAG_TYPE_COLOR_MAP } from '../constants/tag'

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
    const color = TAG_TYPE_COLOR_MAP[type]
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <Container>
        <Menu color={color} inverted={color !== null} widths={2} borderless>
          <Menu.Item>
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
        </Menu>

        <FiltersContainer />
        <Segment vertical basic>
          <ScreenshotCards {...this.props} zooming={zooming} />
        </Segment>
      </Container>
    )
  }
}

TagPage.propTypes = propTypes

export default TagPage
