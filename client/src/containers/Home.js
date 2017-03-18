import React, { Component, PropTypes } from 'react'
import { Container, Segment, Item } from 'semantic-ui-react'
import { connect } from 'react-redux'

import BangumiItem from '../components/BangumiItem'
import SearchBar from '../components/SearchBar'

import { getBangumis } from '../actions/entities'

class Home extends Component {

  componentWillMount () {
    const { dispatch } = this.props

    dispatch(getBangumis())
  }

  render() {
    const { dispatch, isFetching, bangumis, bangumiIds } = this.props

    return (
      <Container text>
        <Segment basic loading={isFetching}>
          <SearchBar
            dispatch={dispatch}
            isFetching={false}
          />

          <Item.Group divided>
            {bangumiIds.map(id =>
              <BangumiItem
                key={id}
                { ...bangumis[id] }
              />
            )}
          </Item.Group>
        </Segment>
      </Container>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bangumis: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { entities, bangumis } = state
  const { isFetching, ids } = bangumis

  return {
    isFetching,
    bangumis: entities.bangumis,
    bangumiIds: ids
  }
}

export default connect(mapStateToProps)(Home)
