import React, { Component, PropTypes } from 'react'
import { Container, Segment, List } from 'semantic-ui-react'
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
          />

          <List divided verticalAlign='middle' size='big' relaxed='very'>
            {bangumiIds.map(id =>
              <BangumiItem
                key={id}
                { ...bangumis[id] }
              />
            )}
          </List>
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
  const { ids, isFetching } = bangumis

  return {
    isFetching,
    bangumis: entities.bangumis,
    bangumiIds: ids
  }
}

export default connect(mapStateToProps)(Home)
