import React, { Component, PropTypes } from 'react'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router'

class BangumiTitle extends Component {

  render () {
    const { bangumi, size } = this.props
    const { _id, title } = bangumi

    return (
      <Header size={size} dividing>
        <Link to={`/bangumi/${_id}`}>
          {title}
        </Link>
      </Header>
    )
  }
}

BangumiTitle.propTypes = {
  size: PropTypes.string.isRequired,
  bangumi: PropTypes.object.isRequired
}

export default BangumiTitle
