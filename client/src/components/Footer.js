import React, { Component } from 'react'
import { Container, List } from 'semantic-ui-react'

class Footer extends Component {
  render() {
    return (
      <Container text>
        <List bulleted horizontal link>
          <List.Item>
            <a href="https://github.com/kingdido999/atogatari/issues">
              Report An Issue
            </a>
          </List.Item>
          <List.Item>
            <a href="https://github.com/kingdido999/atogatari">
              Source Code
            </a>
          </List.Item>
        </List>
      </Container>
    )
  }
}

export default Footer
