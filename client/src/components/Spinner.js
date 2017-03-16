import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const Spinner = () => (
  <Segment>
    <Dimmer active>
      <Loader />
    </Dimmer>
  </Segment>
)

export default Spinner
