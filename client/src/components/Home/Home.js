import React, { Component, PropTypes } from 'react'
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

    return (
      <section className="container">
        <FilterBar />

        <ScreenshotList quantity={screenshots.length} numRendered={numRendered}>
          {screenshots.map(screenshot =>
            <Screenshot
              key={screenshot._id}
              thumbnail_filename={screenshot.thumbnail_filename}
              original_filename={screenshot.original_filename}
              dispatch={dispatch}
            />
          )}
        </ScreenshotList>
      </section>
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
