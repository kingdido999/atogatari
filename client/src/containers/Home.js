import React, { Component, PropTypes } from 'react'
import { Container, Segment, Item } from 'semantic-ui-react'
import { connect } from 'react-redux'

import BangumiItem from '../components/BangumiItem'
import SearchBar from '../components/SearchBar'

class Home extends Component {

  render() {
    const { dispatch, bangumis } = this.props

    return (
      <Container text>
        <Segment basic>
          <SearchBar
            dispatch={dispatch}
            isFetching={false}
          />

          <Item.Group divided>
            {bangumis.allIds.map(id =>
              <BangumiItem
                key={id}
                { ...bangumis.byId[id] }
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
  const { bangumis } = state

  return {
    bangumis
  }
}

export default connect(mapStateToProps)(Home)
