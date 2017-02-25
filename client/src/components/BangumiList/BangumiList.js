import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'

class BangumiList extends Component {

  render () {
    return (
      <Item.Group divided>
        {this.props.children}
      </Item.Group>
    )
  }
}

export default BangumiList
