import React, { Component, PropTypes } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router'
import { logout } from '../actions/auth'

import SearchBar from './SearchBar'

class Header extends Component {

  handleLogout = (event) => {
    event.preventDefault()
    this.props.dispatch(logout())
  }

  render() {
    const { dispatch, bangumis, isAuthenticated } = this.props

    return (
      <Menu size="huge" fluid>
        <Menu.Item as={Link} to="/" name='bangumi pic' />

        <Menu.Menu position='right'>
          <Menu.Item>
            <SearchBar
              dispatch={dispatch}
              bangumis={bangumis}
            />
          </Menu.Item>

          {!isAuthenticated &&
            <Menu.Item as={Link} to="/login" name='login' activeClassName="active" />
          }

          {isAuthenticated &&
            <Menu.Item as={Link} to="/upload" name='upload' activeClassName="active" />
          }

          {isAuthenticated &&
            <Dropdown item icon='user outline'>
              <Dropdown.Menu>
                <Dropdown.Item icon='favorite' text='My favorites' as={Link} to='/user/favorites' />
                {/* <Dropdown.Item icon='upload' text='My uploads' as={Link} to='/user/uploads' /> */}
                {/* <Dropdown.Item icon='settings' text='Settings' as={Link} to='/user/settings' /> */}
                <Dropdown.Item icon='log out' text='Logout' onClick={this.handleLogout} />
              </Dropdown.Menu>
            </Dropdown>
          }
        </Menu.Menu>
      </Menu>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  bangumis: PropTypes.array.isRequired
}

export default Header
