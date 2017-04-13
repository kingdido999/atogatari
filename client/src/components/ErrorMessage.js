import React, { Component, PropTypes } from 'react'
import { Segment, Container, Message } from 'semantic-ui-react'

const propTypes = {
  content: PropTypes.string.isRequired,
}

class ErrorMessage extends Component {

  render() {
    const { content } = this.props

    return (
      <Segment basic vertical>
        <Container text>
          <Message 
            error 
            content={content} />
        </Container>
      </Segment>
    )
  }
}

ErrorMessage.propTypes = propTypes

export default ErrorMessage
