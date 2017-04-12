import React, { Component, PropTypes } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

import { logout } from '../actions/user'

import GlobalSearch from './GlobalSearch'

class Header extends Component {

  handleLogout = (event) => {
    event.preventDefault()
    const { dispatch } = this.props

    dispatch(logout())
    .then(() => browserHistory.push('/'))
  }

  renderDropdown = () => {
    const { uid } = this.props

    return (
      <Dropdown icon='user outline' item>
        <Dropdown.Menu>
          <Dropdown.Item icon='favorite' text='Favorites' as={Link} to={`/user/${uid}/favorites`} />
          <Dropdown.Item icon='cloud upload' text='Uploads' as={Link} to={`/user/${uid}/uploads`} />
          {/* <Dropdown.Item icon='settings' text='Settings' as={Link} to='/user/settings' /> */}
          <Dropdown.Item icon='log out' text='Logout' onClick={this.handleLogout} />
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  render() {
    const { attached, isMobile, isAuthenticated } = this.props

    return (
      <Menu size="huge" attached={attached} color='red' inverted borderless>
        <Menu.Item as={Link} to="/" name='atogatari' />
        {/* <Menu.Item name='Random' /> */}
        {/* <Menu.Item name='Popular' /> */}

        <Menu.Menu position='right'>
          {!isMobile &&
            <Menu.Item>
              <GlobalSearch
                { ...this.props }
              />
            </Menu.Item>
          }
          
          {!isAuthenticated &&
            <Menu.Item as={Link} to="/login" name='login' activeClassName="active" />
          }

          {isAuthenticated &&
            <Menu.Item as={Link} to="/upload" icon='cloud upload' name='upload' activeClassName="active" />
          }

          {isAuthenticated && this.renderDropdown()}
        </Menu.Menu>
      </Menu>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  uid: PropTypes.string,
  search: PropTypes.object.isRequired,
}

export default Header
