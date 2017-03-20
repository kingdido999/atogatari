import React, { Component, PropTypes } from 'react'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router'

class BangumiTitle extends Component {

  render () {
    const { bangumi, size } = this.props
    const { _id, title } = bangumi

    return (
      <Header as={Link} to={`/bangumi/${_id}`} size={size}>{title}</Header>
    )
  }
}

BangumiTitle.propTypes = {
  size: PropTypes.string.isRequired,
  bangumi: PropTypes.object.isRequired
}

export default BangumiTitle
