import React, { Component, PropTypes } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router'
import { logout } from '../actions/auth'

// import SearchBar from './SearchBar'

class Header extends Component {

  handleLogout = (event) => {
    event.preventDefault()
    this.props.dispatch(logout())
  }

  renderDropdown () {
    const { isAuthenticated } = this.props

    if (!isAuthenticated) return null

    return (
      <Dropdown item icon='user outline'>
        <Dropdown.Menu>
          <Dropdown.Item icon='favorite' text='My favorites' as={Link} to='/user/favorites' />
          <Dropdown.Item icon='upload' text='My uploads' as={Link} to='/user/uploads' />
          {/* <Dropdown.Item icon='settings' text='Settings' as={Link} to='/user/settings' /> */}
          <Dropdown.Item icon='log out' text='Logout' onClick={this.handleLogout} />
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <Menu size="huge" color="orange" inverted fluid>
        <Menu.Item as={Link} to="/" name='bangumi pic' />

        <Menu.Menu position='right'>
          {/* <Menu.Item>
            <SearchBar
              dispatch={dispatch}
              bangumis={bangumis}
            />
          </Menu.Item> */}

          {!isAuthenticated &&
            <Menu.Item as={Link} to="/login" name='login' activeClassName="active" />
          }

          {isAuthenticated &&
            <Menu.Item as={Link} to="/upload" name='upload' activeClassName="active" />
          }

          {this.renderDropdown()}
        </Menu.Menu>
      </Menu>
    )
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default Header
