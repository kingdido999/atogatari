import React, { Component, PropTypes } from 'react'
import { Container, Dimmer, Icon, Grid } from 'semantic-ui-react'
import { showTips } from '../actions/entities'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
}

class TipsDimmer extends Component {
  render() {
    const { active } = this.props

    return (
      <Dimmer active={active} onClickOutside={this.handleClose} page>
        <Container text>
          <Grid textAlign="center" columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Icon name="idea" size="huge" />
              </Grid.Column>
              <Grid.Column>
                <Icon name="keyboard" size="huge" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                Prev Page
              </Grid.Column>
              <Grid.Column>
                Left Arrow / k
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                Next Page
              </Grid.Column>
              <Grid.Column>
                Right Arrow / j
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                Switch View
              </Grid.Column>
              <Grid.Column>
                Space
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                Show Tips
              </Grid.Column>
              <Grid.Column>
                Enter
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                Reload
              </Grid.Column>
              <Grid.Column>
                r
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

      </Dimmer>
    )
  }

  handleClose = () => {
    const { dispatch } = this.props
    dispatch(showTips(false))
  }
}

TipsDimmer.propTypes = propTypes

export default TipsDimmer
