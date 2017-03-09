import React, { Component, PropTypes } from 'react'
import { Item } from 'semantic-ui-react'
import { Link } from 'react-router'

import { pluralize } from '../utils'

class BangumiItem extends Component {

  render () {
    const { _id, title, meta } = this.props
    const { screenshotsCount } = meta

    return (
      <Item as={Link} to={`/bangumi/${_id}`}>
        <Item.Content>
          <Item.Header>{ title }</Item.Header>
          <Item.Meta>{ screenshotsCount } { pluralize('screenshot', screenshotsCount) }</Item.Meta>
        </Item.Content>
      </Item>
    )
  }
}

BangumiItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default BangumiItem
