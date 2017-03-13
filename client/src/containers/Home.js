import React, { Component, PropTypes } from 'react'
import { Container, Segment, Item } from 'semantic-ui-react'
import { connect } from 'react-redux'

import BangumiItem from '../components/BangumiItem'
import SearchBar from '../components/SearchBar'

import { getBangumis } from '../actions/entities'

class Home extends Component {

  componentWillMount () {
    this.props.dispatch(getBangumis())
  }

  render() {
    const { dispatch, bangumis, bangumiIds } = this.props

    return (
      <Container text>
        <Segment basic>
          <SearchBar
            dispatch={dispatch}
            isFetching={false}
          />

          <Item.Group divided>
            {bangumiIds.map(bangumiId =>
              <BangumiItem
                key={bangumiId}
                { ...bangumis[bangumiId] }
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
  isFetching: PropTypes.bool.isRequired,
  bangumis: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { entities, bangumis } = state

  return {
    isFetching: bangumis.isFetching,
    bangumis: entities.bangumis,
    bangumiIds: bangumis.items
  }
}

export default connect(mapStateToProps)(Home)
