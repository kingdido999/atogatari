import React, { Component } from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import { Link } from 'react-router'

class User extends Component {

  render() {
    return (
      <Segment basic>
        <Menu secondary>
          <Menu.Item as={Link} to='/user/favorites' name='My favorites' activeClassName="active" />
          <Menu.Item as={Link} to='/user/uploads' name='My uploads' activeClassName="active" />
          {/* <Menu.Item name='Settings' activeClassName="active" /> */}
        </Menu>

        {this.props.children}
      </Segment>
    )
  }
}

User.propTypes = {}

export default User
