import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Menu, Header } from 'semantic-ui-react'
import { Link } from 'react-router'
import moment from 'moment'

class User extends Component {

  render() {
    const { userId, user } = this.props
    if (!user) return null

    return (
      <Container>
        <Segment>
          <Menu secondary>
            <Menu.Item>
              <Header>
                <Link to={`/user/${userId}`}>{user.username}</Link>
                <Header.Subheader>Joined {moment(user.createdAt).fromNow()}</Header.Subheader>
              </Header>
            </Menu.Item>
            <Menu.Item as={Link} to={`/user/${userId}/favorites`} name='Favorites' activeClassName="active" />
            <Menu.Item as={Link} to={`/user/${userId}/uploads`} name='Uploads' activeClassName="active" />
            {/* <Menu.Item name='Settings' activeClassName="active" /> */}
          </Menu>
        </Segment>

        <Segment vertical>
          {this.props.children}
        </Segment>
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { entities } = state
  const { users } = entities
  const { params } = ownProps
  const { userId } = params

  return {
    userId: userId,
    user: users[userId]
  }
}

export default connect(mapStateToProps)(User)
