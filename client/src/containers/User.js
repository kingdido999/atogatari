import React, { Component, PropTypes } from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Zooming from 'zooming'

import { getFavoriteScreenshots } from '../actions/authed'

class User extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    const token = localStorage.getItem('token')

    dispatch(getFavoriteScreenshots({
      token: token
    }))
  }

  render() {
    const { dispatch, favoriteScreenshots, isAuthenticated } = this.props

    const zooming = new Zooming()

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       dispatch,
       favoriteScreenshots,
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
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { auth, authed } = state
  const { isAuthenticated } = auth
  const { favoriteScreenshots } = authed

  return {
    isAuthenticated,
    favoriteScreenshots,
  }
}

export default connect(mapStateToProps)(User)
