import React, { Component, PropTypes } from 'react'
import { Container, Segment, Menu, Label } from 'semantic-ui-react'
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
    const { tag } = this.props
    if (!tag) return null
    const { name, type } = tag
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <Container>
        <Menu fixed="bottom" className="opacity-high" secondary borderless>
          <Menu.Item>
            <Label color={TAG_TYPE_COLOR_MAP[type]} circular empty />
          </Menu.Item>
          <Menu.Item header>
            {name.toUpperCase()}
          </Menu.Item>
          <Menu.Item>
            <TagTypesDropdown
              {...this.props}
              name={name}
              type={type}
              upward={true}
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
