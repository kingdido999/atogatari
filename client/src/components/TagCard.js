import React, { Component, PropTypes } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import { Link } from 'react-router'

import TagTypesDropdown from './TagTypesDropdown'
import { TAG_TYPE_COLOR_MAP } from '../constants/tag'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tag: PropTypes.object.isRequired
}

export class TagCard extends Component {
  render() {
    const { tag, isAuthenticated } = this.props
    const { name, type } = tag
    const color = TAG_TYPE_COLOR_MAP[type]

    return (
      <Card color={color}>
        <Card.Content>
          <Card.Header>
            <Grid>
              <Grid.Column floated="left" width={13}>
                <Link to={`/tag/${name}`}>{name}</Link>
              </Grid.Column>
              <Grid.Column floated="right" width={3} textAlign="right">
                <small className="text grey">+{tag.screenshots.length}</small>
              </Grid.Column>
            </Grid>

          </Card.Header>
        </Card.Content>
        {isAuthenticated &&
          <Card.Content>
            <TagTypesDropdown {...this.props} name={name} type={type} />
          </Card.Content>}
      </Card>
    )
  }
}

TagCard.propTypes = propTypes

export default TagCard
