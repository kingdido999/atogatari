import React, { Component, PropTypes } from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Zooming from 'zooming'

import { getFavorites, getFavoriteScreenshots } from '../actions/authed'

class User extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    const token = localStorage.getItem('token')

    dispatch(getFavorites({
      token: token
    }))

    dispatch(getFavoriteScreenshots({
      token: token
    }))
  }

  render() {
    const { dispatch, favorites, favoriteScreenshots, screenshots, isAuthenticated } = this.props
    const zooming = new Zooming()

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       dispatch,
       favorites,
       favoriteScreenshots,
       screenshots,
       zooming,
       isAuthenticated
     })
    )

    return (
      <Segment basic>
        <Menu secondary>
          <Menu.Item as={Link} to='/user/favorites' name='My favorites' activeClassName="active" />
          {/* <Menu.Item as={Link} to='/user/uploads' name='My uploads' activeClassName="active" /> */}
          {/* <Menu.Item name='Settings' activeClassName="active" /> */}
        </Menu>

        {childrenWithProps}
      </Segment>
    )
  }
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  screenshots: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { auth, authed, entities } = state
  const { isAuthenticated } = auth
  const { favorites, favoriteScreenshots } = authed
  const { screenshots } = entities

  return {
    isAuthenticated,
    favorites,
    favoriteScreenshots,
    screenshots
  }
}

export default connect(mapStateToProps)(User)
