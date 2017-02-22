import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router'
import { logout } from '../../actions/auth'

class Header extends Component {

  handleLogout = (event) => {
    event.preventDefault()
    this.props.dispatch(logout())
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <Menu pointing secondary>
        <Menu.Item as={Link} to="/" name='bangumi pic' />

        <Menu.Menu position='right'>
          {!isAuthenticated &&
            <Menu.Item as={Link} to="/signup" name='signup' activeClassName="active" />
          }

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
