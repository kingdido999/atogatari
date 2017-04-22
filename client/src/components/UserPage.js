import React, { Component, PropTypes } from 'react'
import { Container, Segment, Menu, Header } from 'semantic-ui-react'
import { Link } from 'react-router'
import moment from 'moment'

const propTypes = {
  user: PropTypes.object
}

class UserPage extends Component {
  render() {
    const { user } = this.props
    if (!user) return null

    return (
      <Container>
        <Segment>
          <Menu secondary>
            <Menu.Item>
              <Header>
                <Link to={`/user/${user._id}`}>{user.username}</Link>
                <Header.Subheader>
                  Joined {moment(user.createdAt).fromNow()}
                </Header.Subheader>
              </Header>
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={`/user/${user._id}/favorites`}
              name="Favorites"
              activeClassName="active"
            />
            <Menu.Item
              as={Link}
              to={`/user/${user._id}/uploads`}
              name="Uploads"
              activeClassName="active"
            />
            {/* <Menu.Item name='Settings' activeClassName="active" /> */}
          </Menu>
        </Segment>

        <Segment basic vertical>
          {this.props.children}
        </Segment>

      </Container>
    )
  }
}

UserPage.propTypes = propTypes

export default UserPage
