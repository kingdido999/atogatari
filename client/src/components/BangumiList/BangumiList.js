import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class BangumiList extends Component {

  render () {
    return (
      <Card.Group>
        {this.props.children}
      </Card.Group>
    )
  }
}

export default BangumiList
