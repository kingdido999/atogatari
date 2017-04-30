import React, { Component, PropTypes } from 'react'
import { Container, Menu, Header, Label } from 'semantic-ui-react'
import { Link } from 'react-router'

import FiltersContainer from '../containers/FiltersContainer'

const propTypes = {
  user: PropTypes.object,
  showFilters: PropTypes.bool
}

class UserPage extends Component {
  render() {
    const { user, showFilters } = this.props
    if (!user) return null

    return (
      <Container>
        <Menu fixed="bottom" className="transparent-white" secondary borderless>
          <Menu.Item>
            <Header>
              <Link to={`/user/${user._id}`}>{user.username}</Link>
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
              <Label color="yellow" content={user.favorites.length} />}
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={`/user/${user._id}/uploads`}
            name="Uploads"
            activeClassName="active"
          >
            Uploads
            {user.screenshots.length > 0 &&
              <Label color="teal" content={user.screenshots.length} />}
          </Menu.Item>
          {/* <Menu.Item name='Settings' activeClassName="active" /> */}

          {showFilters && <FiltersContainer />}

        </Menu>

        {this.props.children}

      </Container>
    )
  }
}

UserPage.propTypes = propTypes

export default UserPage
