import React, { Component, PropTypes } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'

import BangumiCards from '../components/BangumiCards'
import SearchBar from '../components/SearchBar'

import { getBangumis } from '../actions/entities'

class Home extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getBangumis())
  }

  render() {
    const { dispatch, bangumis, bangumiIds } = this.props

    return (
      <div>
        <Segment vertical>
          <Container text>
            <SearchBar
              dispatch={dispatch}
            />
          </Container>

        </Segment>

        <Segment vertical>
          <Container text>
            <BangumiCards
              bangumis={bangumis}
              bangumiIds={bangumiIds}
            />
          </Container>

        </Segment>
      </div>
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
