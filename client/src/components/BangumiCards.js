import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import BangumiCard from './BangumiCard'

class BangumiCards extends Component {

  render () {
    const { bangumis, bangumiIds } = this.props

    return (
      <Card.Group>
        {bangumiIds.map(id =>
          <BangumiCard
            key={id}
            bangumi={bangumis[id]}
          />
        )}
      </Card.Group>
    )
  }
}

BangumiCards.propTypes = {
  bangumis: PropTypes.object.isRequired,
  bangumiIds: PropTypes.array.isRequired,
}

export default BangumiCards
