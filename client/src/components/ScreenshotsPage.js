import React, { Component, PropTypes } from 'react'
import { Container, Segment, Menu } from 'semantic-ui-react'
import Zooming from 'zooming'

import FiltersContainer from '../containers/FiltersContainer'
import ScreenshotCards from './ScreenshotCards'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired,
  authedUser: PropTypes.object,
  tags: PropTypes.object.isRequired,
  screenshots: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired
}

class ScreenshotsPage extends Component {
  render() {
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <Container>
        <Menu fixed="bottom" className="transparent-white" secondary borderless>
          <Menu.Item content="All Screenshots" />
          <FiltersContainer />
        </Menu>

        <Segment vertical basic>
          <ScreenshotCards {...this.props} zooming={zooming} />
        </Segment>
      </Container>
    )
  }
}

ScreenshotsPage.propTypes = propTypes

export default ScreenshotsPage
