import React, { Component } from 'react'
import { Container, Segment, Menu } from 'semantic-ui-react'
import { Link } from 'react-router'

class User extends Component {

  render() {
    return (
      <Container>
        <Menu pointing secondary>
          <Menu.Item as={Link} to='/user/favorites' name='My favorites' activeClassName="active" />
          <Menu.Item as={Link} to='/user/uploads' name='My uploads' activeClassName="active" />
          {/* <Menu.Item name='Settings' activeClassName="active" /> */}
        </Menu>

        <Segment vertical>
          {this.props.children}
        </Segment>
      </Container>
    )
  }
}

User.propTypes = {}

export default User
