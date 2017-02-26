import React, { Component, PropTypes } from 'react'
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'

import BangumiList from '../BangumiList'
import Bangumi from '../Bangumi'

import { getBangumis } from '../../actions/bangumi'

class Home extends Component {

  componentDidMount () {
    this.props.dispatch(getBangumis())
  }

  render() {
    const { isFetching, bangumis } = this.props

    return (
      <Segment basic loading={isFetching}>
        <BangumiList>
          {bangumis.map(bangumi =>
            <Bangumi
              key={bangumi._id}
              title={bangumi.title}
              episodes={bangumi.episodes}
            />
          )}
        </BangumiList>
      </Segment>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  bangumis: PropTypes.array.isRequired
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { bangumi } = state
  const { isFetching, bangumis } = bangumi

  return {
    isFetching,
    bangumis
  }
}

export default connect(mapStateToProps)(Home)
