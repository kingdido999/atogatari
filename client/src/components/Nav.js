import React, { Component, PropTypes } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router'

import { logout } from '../actions/user'
import GlobalSearch from './GlobalSearch'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  attached: PropTypes.oneOf(['top', false]).isRequired,
  uid: PropTypes.string,
  search: PropTypes.object.isRequired
}

class Nav extends Component {
  handleLogout = event => {
    event.preventDefault()
    const { dispatch } = this.props

    dispatch(logout())
  }

  renderDropdown = () => {
    const { uid } = this.props

    return (
      <Dropdown icon="user outline" item>
        <Dropdown.Menu>
          <Dropdown.Item
            icon="favorite"
            text="Favorites"
            as={Link}
            to={`/user/${uid}/favorites`}
          />
          <Dropdown.Item
            icon="cloud upload"
            text="Uploads"
            as={Link}
            to={`/user/${uid}/uploads`}
          />
          {/* <Dropdown.Item icon='settings' text='Settings' as={Link} to='/user/settings' /> */}
          <Dropdown.Item
            icon="log out"
            text="Logout"
            onClick={this.handleLogout}
          />
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  render() {
    const { attached, isMobile, isAuthenticated } = this.props

    return (
      <Menu size="large" attached={attached} borderless>
        <Menu.Item as={Link} to="/" name="ATOGATARI" header />
        <Menu.Item
          as={Link}
          to="/screenshots"
          name="screenshots"
          activeClassName="active"
        />
        <Menu.Item as={Link} to="/tags" name="tags" activeClassName="active" />

        <Menu.Menu position="right">
          {!isMobile &&
            <Menu.Item>
              <GlobalSearch {...this.props} />
            </Menu.Item>}

          {!isAuthenticated &&
            <Menu.Item
              as={Link}
              to="/login"
              name="login"
              activeClassName="active"
            />}

          {isAuthenticated &&
            <Menu.Item
              as={Link}
              to="/upload"
              icon="cloud upload"
              name="upload"
              activeClassName="active"
            />}

          {isAuthenticated && this.renderDropdown()}
        </Menu.Menu>
      </Menu>
    )
  }
}

Nav.propTypes = propTypes

export default Nav
