import React, { Component, PropTypes } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

import { logout } from '../actions/user'

class Header extends Component {

  handleLogout = (event) => {
    event.preventDefault()
    const { dispatch } = this.props

    dispatch(logout())
    .then(() => browserHistory.push('/'))
  }

  renderDropdown () {
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
      <Menu size="huge" color="orange" fluid>
        <Menu.Item as={Link} to="/" name='bangumi pic' />

        <Menu.Menu position='right'>

          {!isAuthenticated &&
            <Menu.Item as={Link} to="/login" name='login' activeClassName="active" />
          }

          {isAuthenticated &&
            <Menu.Item as={Link} to="/upload" name='upload' icon='upload' activeClassName="active" />
          }

          {isAuthenticated && this.renderDropdown()}
        </Menu.Menu>
      </Menu>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default Header
