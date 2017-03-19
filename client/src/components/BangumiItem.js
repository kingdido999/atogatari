import React, { Component, PropTypes } from 'react'
import { List, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router'

class BangumiItem extends Component {

  render () {
    const { _id, title, screenshots } = this.props
    const screenshotsCount = screenshots.length

    return (
      <List.Item as={Link} to={`/bangumi/${_id}`}>
        <List.Content floated='right'>
          <Label>
            <Icon name='image' /> { screenshotsCount }
          </Label>
        </List.Content>
        <List.Content>
          <List.Header>{ title }</List.Header>
        </List.Content>
      </List.Item>
    )
  }
}

BangumiItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  screenshots: PropTypes.array.isRequired
}

export default BangumiItem
