import React, { Component } from 'react'
import { Container, List } from 'semantic-ui-react'

class Footer extends Component {

  render() {
    return (
      <Container text>
        <List bulleted horizontal link>
          <List.Item as='a'>Terms and Conditions</List.Item>
          <List.Item as='a'>Privacy Policy</List.Item>
          <List.Item as='a'>About</List.Item>
        </List>
      </Container>
    )
  }
}

export default Footer
