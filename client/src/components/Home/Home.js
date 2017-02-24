import React, { Component, PropTypes } from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getAllScreenshots } from '../../actions/screenshot'

import FilterBar from '../FilterBar'
import ScreenshotList from '../ScreenshotList'
import Screenshot from '../Screenshot'

class Home extends Component {

  componentDidMount() {
    this.props.dispatch(getAllScreenshots())
  }

  render() {
    const { dispatch, screenshots, numRendered } = this.props
    const limitedScreenshots = screenshots.slice(0, 20)

    return (
      <Grid>
        <Grid.Row>
          <FilterBar />
        </Grid.Row>

        <Grid.Row>
          <ScreenshotList quantity={limitedScreenshots.length} numRendered={numRendered}>
            {limitedScreenshots.map(screenshot =>
              <Screenshot
                key={screenshot._id}
                bangumi_title={screenshot.bangumi.title}
                thumbnail_filename={screenshot.thumbnail_filename}
                original_filename={screenshot.original_filename}
                dispatch={dispatch}
              />
            )}
          </ScreenshotList>
        </Grid.Row>
      </Grid>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  screenshots: PropTypes.array.isRequired,
  numRendered: PropTypes.number.isRequired
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { screenshot } = state
  const { isFetching, errorMessage, screenshots, numRendered } = screenshot

  return {
    isFetching,
    errorMessage,
    screenshots,
    numRendered
  }
}

export default connect(mapStateToProps)(Home)
