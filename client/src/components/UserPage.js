import React, { Component, PropTypes } from 'react'
import { Container, Segment, Menu, Header, Label } from 'semantic-ui-react'
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
            >
              Favorites
              {user.favorites.length > 0 &&
                <Label
                  color="yellow"
                  content={user.favorites.length}
                  floating
                />}
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={`/user/${user._id}/uploads`}
              name="Uploads"
              activeClassName="active"
            >
              Uploads
              {user.screenshots.length > 0 &&
                <Label
                  color="teal"
                  content={user.screenshots.length}
                  floating
                />}
            </Menu.Item>
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
