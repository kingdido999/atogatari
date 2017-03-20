import React, { Component, PropTypes } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

import { logout } from '../actions/user'

import GlobalSearch from '../components/GlobalSearch'

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
    const { dispatch, isAuthenticated, results } = this.props

    return (
      <Menu size="huge" color="orange" fluid>
        <Menu.Item as={Link} to="/" name='bangumi pic' />

        <Menu.Menu position='right'>
          <Menu.Item>
            <GlobalSearch
              dispatch={dispatch}
              results={results}
            />
          </Menu.Item>

          {!isAuthenticated &&
            <Menu.Item as={Link} to="/login" name='login' activeClassName="active" />
          }

          {isAuthenticated &&
            <Menu.Item as={Link} to="/upload" name='upload' activeClassName="active" />
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
  results: PropTypes.array.isRequired
}

function mapStateToProps (state, ownProps) {
  const { user, entities, bangumis } = state
  const { isAuthenticated } = user
  const results = bangumis.ids.map(id => entities.bangumis[id])

  return {
    isAuthenticated,
    results
  }
}

export default connect(mapStateToProps)(Header)
