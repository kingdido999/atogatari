import React, { Component, PropTypes } from 'react'
import { List, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router'

class BangumiItem extends Component {

  render () {
    const { bangumi } = this.props
    const { _id, title, screenshots } = bangumi

    return (
      <List.Item as={Link} to={`/bangumi/${_id}`}>
        <List.Content floated='right'>
          <Label>
            <Icon name='image' /> { screenshots.length }
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
  bangumi: PropTypes.object.isRequired
}

export default BangumiItem
