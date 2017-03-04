import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
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
            <Menu.Item name='logout' onClick={this.handleLogout} />
          }
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Header
