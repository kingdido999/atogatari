import React, { Component, PropTypes } from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Zooming from 'zooming'

class User extends Component {

  render() {
    const { dispatch, allScreenshots, userScreenshots, allFavorites, userFavorites, isAuthenticated } = this.props

    const zooming = new Zooming()

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       dispatch,
       allScreenshots,
       userScreenshots,
       allFavorites,
       userFavorites,
       zooming,
       isAuthenticated
     })
    )

    return (
      <Segment basic>
        <Menu secondary>
          <Menu.Item as={Link} to='/user/favorites' name='My favorites' activeClassName="active" />
          <Menu.Item as={Link} to='/user/uploads' name='My uploads' activeClassName="active" />
          {/* <Menu.Item name='Settings' activeClassName="active" /> */}
        </Menu>

        {childrenWithProps}
      </Segment>
    )
  }
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { user, screenshots, favorites, authed } = state
  const { isAuthenticated } = user

  return {
    isAuthenticated,
    allScreenshots: screenshots,
    userScreenshots: authed.screenshots,
    allFavorites: favorites,
    userFavorites: authed.favorites
  }
}

export default connect(mapStateToProps)(User)
