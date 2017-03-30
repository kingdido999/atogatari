import React, { Component } from 'react'
import { Container, Segment, Menu } from 'semantic-ui-react'
import { Link } from 'react-router'

class User extends Component {

  render() {
    const { params } = this.props
    const { userId } = params

    return (
      <Container>
        <Menu pointing secondary>
          <Menu.Item as={Link} to={`/user/${userId}/favorites`} name='Favorites' activeClassName="active" />
          <Menu.Item as={Link} to={`/user/${userId}/uploads`} name='Uploads' activeClassName="active" />
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
