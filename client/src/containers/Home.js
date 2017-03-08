import React, { Component, PropTypes } from 'react'
import { Segment, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'

import BangumiCard from '../components/BangumiCard'

import { getBangumis } from '../actions/bangumi'

class Home extends Component {

  componentWillMount () {
    this.props.dispatch(getBangumis())
  }

  render() {
    const { isFetching, bangumis } = this.props

    return (
      <Segment basic loading={isFetching}>
        <Card.Group>
          {bangumis.map(bangumi =>
            <BangumiCard
              key={bangumi._id}
              { ...bangumi }
            />
          )}
        </Card.Group>
      </Segment>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  bangumis: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { bangumi } = state
  const { isFetching, bangumis } = bangumi

  return {
    isFetching,
    bangumis
  }
}

export default connect(mapStateToProps)(Home)
