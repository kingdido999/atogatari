import React, { Component, PropTypes } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { browserHistory } from 'react-router'


class BangumiCard extends Component {

  handleClick = () => {
    const { bangumi } = this.props
    browserHistory.push(`/bangumi/${bangumi._id}`)
  }

  render () {
    const { bangumi } = this.props
    const { title, screenshots } = bangumi

    return (
      <Card onClick={this.handleClick} fluid>
        <Card.Content>
          <Card.Header>
            { title }
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Card.Meta>
            <Icon name='image' /> { screenshots.length }
          </Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}

BangumiCard.propTypes = {
  bangumi: PropTypes.object.isRequired
}

export default BangumiCard
