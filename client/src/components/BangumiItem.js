import React, { Component, PropTypes } from 'react'
import { List, Statistic } from 'semantic-ui-react'
import { Link } from 'react-router'

class BangumiItem extends Component {

  render () {
    const { bangumi } = this.props
    const { _id, title, screenshots } = bangumi

    return (
      <List.Item as={Link} to={`/bangumi/${_id}`}>
        <List.Content floated='right'>
          <Statistic size='mini' color='grey'>
            <Statistic.Value>
              { screenshots.length }
            </Statistic.Value>
          </Statistic>
        </List.Content>
        <List.Content>
          <List.Header size='huge'>{ title }</List.Header>
        </List.Content>
      </List.Item>
    )
  }
}

BangumiItem.propTypes = {
  bangumi: PropTypes.object.isRequired
}

export default BangumiItem
