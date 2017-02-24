import React, { Component, PropTypes } from 'react'
import { Card, Image } from 'semantic-ui-react'
import { screenshotRendered } from '../../actions/screenshot'

import './screenshot.css'

class Screenshot extends Component {

  componentDidMount () {
    this.props.dispatch(screenshotRendered())
  }

  render () {
    const { bangumi_title, thumbnail_filename, original_filename } = this.props
    const path = 'http://localhost:3001/screenshots'
    const thumbnailUrl = isFullUrl(thumbnail_filename)
      ? thumbnail_filename
      : `${path}/${thumbnail_filename}`

    const originalUrl = isFullUrl(original_filename)
      ? original_filename
      : `${path}/${original_filename}`

    return (
      <Card>
        <Image
          src={thumbnailUrl}
          data-original={originalUrl}
          className="screenshot"
          alt=""
        />

        <Card.Content>
          <Card.Header>
            {bangumi_title}
          </Card.Header>
          {/* <Card.Meta>
            <span className='date'>
              Joined in 2015
            </span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description> */}
        </Card.Content>
      </Card>
    )
  }
}

function isFullUrl (url) {
  return url.includes('http')
}

Screenshot.propTypes = {
  bangumi_title: PropTypes.string.isRequired,
  thumbnail_filename: PropTypes.string.isRequired,
  original_filename: PropTypes.string.isRequired
}

export default Screenshot
