import React, { Component, PropTypes } from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { getFavorites } from '../actions/favorite'

class User extends Component {

  componentWillMount () {
    const { dispatch } = this.props

    dispatch(getFavorites({
      token: localStorage.getItem('token')
    }))
  }

  render() {
    const { dispatch, isFetching, favorites, isAuthenticated } = this.props

    if (isFetching) return null

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       dispatch,
       isFetching,
       favorites,
       isAuthenticated
     })
    )

    return (
      <Segment basic>
        <Menu secondary>
          <Menu.Item name='My favorites' />
          <Menu.Item name='My uploads' />
          <Menu.Item name='Settings' />
        </Menu>

        {childrenWithProps}
      </Segment>
    )
  }
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { auth, favorite } = state
  const { isAuthenticated } = auth
  const { isFetching, favorites } = favorite

  return {
    isAuthenticated,
    isFetching,
    favorites,
  }
}

export default connect(mapStateToProps)(User)
