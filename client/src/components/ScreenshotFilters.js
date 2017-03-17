import React, { Component } from 'react'
import { Menu, Label } from 'semantic-ui-react'



class ScreenshotFilters extends Component {

  filterByEpisode = () => {
    // const { dispatch } = this.props
  }

  render () {
    const { episodes } = this.props

    return (
      <Menu secondary>
        <Label.Group circular>
          {episodes.map((episode, index) =>
            <Label as='a' key={index}>{episode}</Label>
          )}
        </Label.Group>
      </Menu>
    )
  }
}

export default ScreenshotFilters
