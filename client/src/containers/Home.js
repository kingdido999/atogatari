import React, { Component, PropTypes } from 'react'
import { Segment, Item } from 'semantic-ui-react'
import { connect } from 'react-redux'

import BangumiItem from '../components/BangumiItem'

import { getBangumis } from '../actions/entities'

class Home extends Component {

  componentWillMount () {
    this.props.dispatch(getBangumis())
  }

  render() {
    const { isFetching, bangumis } = this.props

    return (
      <Segment basic loading={isFetching}>
        <Item.Group divided>
          {bangumis.map(bangumi =>
            <BangumiItem
              key={bangumi._id}
              { ...bangumi }
            />
          )}
        </Item.Group>
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
  const { entities } = state
  const { isFetching, bangumis } = entities

  return {
    isFetching,
    bangumis
  }
}

export default connect(mapStateToProps)(Home)
