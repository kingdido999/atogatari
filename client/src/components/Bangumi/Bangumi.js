import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

import { getBangumi } from '../../actions/bangumi'

class Bangumi extends Component {

  componentWillMount () {
    const id = this.props.params.bangumiId
    this.props.dispatch(getBangumi({ id: id }))
  }

  render () {
    const { bangumiItem } = this.props

    if (!bangumiItem) return null

    return (
      <Header>{bangumiItem.title}</Header>
    )
  }
}

Bangumi.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { bangumi } = state
  const { isFetching, bangumiItem } = bangumi

  return {
    isFetching,
    bangumiItem
  }
}

export default connect(mapStateToProps)(Bangumi)
