import React, { Component, PropTypes } from 'react'
import { Menu, Dropdown, Label } from 'semantic-ui-react'
import { Link } from 'react-router'

import { logout } from '../actions/authed'
import GlobalSearch from './GlobalSearch'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  uid: PropTypes.string,
  search: PropTypes.object.isRequired,
  tagLists: PropTypes.object.isRequired
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
    const { isMobile } = this.props

    if (isMobile) return this.renderMobileMenu()
    return this.renderMenu()
  }

  renderMenu = () => {
    const { isAuthenticated, tagLists } = this.props
    const { Character, Anime, General } = tagLists

    return (
      <Menu
        size="large"
        fixed="top"
        className="opacity-high"
        secondary
        borderless
      >
        <Menu.Item as={Link} to="/" name="ATOGATARI" header />
        <Menu.Item
          as={Link}
          to="/tags/character"
          name="CHARACTER"
          activeClassName="active"
        >
          CHARACTER
          {Character &&
            <Label content={Character.names.length} color="orange" />}
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/tags/anime"
          name="ANIME"
          activeClassName="active"
        >
          ANIME
          {Anime && <Label content={Anime.names.length} color="blue" />}
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/tags/general"
          name="GENERAL"
          activeClassName="active"
        >
          GENERAL
          {General && <Label content={General.names.length} color="teal" />}
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <GlobalSearch {...this.props} />
          </Menu.Item>

          {!isAuthenticated &&
            <Menu.Item
              as={Link}
              to="/login"
              name="LOGIN"
              activeClassName="active"
            />}

          {isAuthenticated &&
            <Menu.Item
              as={Link}
              to="/upload"
              name="UPLOAD"
              activeClassName="active"
            />}

          {isAuthenticated && this.renderDropdown()}
        </Menu.Menu>
      </Menu>
    )
  }

  renderMobileMenu = () => {
    const { isAuthenticated } = this.props

    return (
      <Menu
        size="large"
        fixed="top"
        className="opacity-high"
        secondary
        borderless
      >
        <Menu.Item as={Link} to="/" name="ATOGATARI" header fitted />

        <Menu.Item
          as={Link}
          to="/tags/character"
          name="CHARACTER"
          activeClassName="active"
          fitted
        />
        <Menu.Item
          as={Link}
          to="/tags/anime"
          name="ANIME"
          activeClassName="active"
          fitted
        />
        <Menu.Item
          as={Link}
          to="/tags/general"
          name="GENERAL"
          activeClassName="active"
          fitted
        />

        <Menu.Menu position="right">
          {!isAuthenticated &&
            <Menu.Item
              as={Link}
              to="/login"
              name="LOGIN"
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
