import React, { Component, PropTypes } from 'react'
import { Item } from 'semantic-ui-react'


class Bangumi extends Component {

  render () {
    const { title } = this.props

    return (
      <Item>
        <Item.Content>
          <Item.Header>{ title }</Item.Header>
          {/* <Item.Group>
            {screenshots.map(screenshot =>
              <Item>
                <Item.Image  />
              </Item>
            )}
          </Item.Group> */}
        </Item.Content>
      </Item>
    )
  }
}

Bangumi.propTypes = {
  title: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired
}

export default Bangumi
