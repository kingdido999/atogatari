import React, { Component, PropTypes } from 'react'
import { Card, Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import TagTypesDropdown from './TagTypesDropdown'
import { TAG_TYPE_COLOR_MAP } from '../constants/tag'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tag: PropTypes.object.isRequired
}

export class TagCard extends Component {
  render() {
    const { tag } = this.props
    const { name, type } = tag
    const color = TAG_TYPE_COLOR_MAP[type]

    return (
      <Card color={color}>
        <Card.Content>
          <Card.Header>
            {name}
          </Card.Header>
          <Card.Meta>
            {tag.screenshots.length}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button content="View" onClick={this.handleView} />
          <TagTypesDropdown {...this.props} name={name} type={type} />
        </Card.Content>
      </Card>
    )
  }

  handleView = () => {
    const { tag } = this.props
    const { name } = tag
    browserHistory.push(`/tag/${name}`)
  }
}

TagCard.propTypes = propTypes

export default TagCard
