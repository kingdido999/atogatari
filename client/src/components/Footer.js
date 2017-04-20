import React, { Component } from 'react'
import { Segment, Container, List } from 'semantic-ui-react'

class Footer extends Component {
  render() {
    return (
      <Segment textAlign="center" vertical padded>
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
      </Segment>
    )
  }
}

export default Footer
