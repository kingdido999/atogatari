import merge from 'lodash/merge'

const initialState = {
  bangumis: {},
  screenshots: {}
}

export default function entities (state = initialState, action) {
  if (!action.payload || !action.payload.data) return state

  const { entities } = action.payload.data

  if (entities) {
    return merge({}, state, entities)
  }

return state

  // switch (action.type) {
  //   case 'GET_BANGUMIS_PENDING':
  //     return { ...state,
  //       isFetching: true
  //     }
  //   case 'GET_BANGUMIS_FULFILLED':
  //     return { ...state,
  //       isFetching: false,
  //       bangumis: action.payload.data.bangumis
  //     }
  //   case 'GET_BANGUMIS_REJECTED':
  //     return { ...state,
  //       isFetching: false
  //     }
  //   case 'GET_BANGUMI_PENDING':
  //     return { ...state,
  //       isFetching: true
  //     }
  //   case 'GET_BANGUMI_FULFILLED':
  //     const { bangumi } = action.payload.data
  //     const { screenshots } = bangumi
  //
  //     return { ...state,
  //       isFetching: false,
  //       selectedBangumi: bangumi,
  //       screenshots: screenshots,
  //       favorites: screenshots.reduce((acc, screenshot) => {
  //         return acc.concat(screenshot.favorites)
  //       }, [])
  //     }
  //   case 'GET_BANGUMI_REJECTED':
  //     return { ...state,
  //       isFetching: false
  //     }
  //   case 'GET_SCREENSHOT_PENDING':
  //     return { ...state,
  //       isFetching: true
  //     }
  //   case 'GET_SCREENSHOT_FULFILLED':
  //     const { screenshot } = action.payload.data
  //
  //     return { ...state,
  //       isFetching: false,
  //       selectedScreenshot: screenshot,
  //       favorites: screenshot.favorites
  //     }
  //   case 'GET_SCREENSHOT_REJECTED':
  //     return { ...state,
  //       isFetching: false
  //     }
  //   case 'TOGGLE_FAVORITE_FULFILLED':
  //     const added = action.payload.status === 201
  //     const targetFavorite = action.payload.data.favorite
  //
  //     return { ...state,
  //       favorites: added
  //       ? [ ...state.favorites, targetFavorite ]
  //       : state.favorites.filter(favorite => {
  //         return favorite._id !== targetFavorite._id
  //       })
  //     }
  //   case 'GET_FAVORITE_SCREENSHOTS_FULFILLED':
  //     const favoriteScreenshots = action.payload.data.screenshots
  //
  //     return { ...state,
  //       isFetching: false,
  //       screenshots: favoriteScreenshots,
  //       favorites: favoriteScreenshots.reduce((acc, screenshot) => {
  //         return acc.concat(screenshot.favorites)
  //       }, [])
  //     }
  //   case 'GET_UPLOADED_SCREENSHOTS_FULFILLED':
  //     const uploadedScreenshots = action.payload.data.screenshots
  //
  //     return { ...state,
  //       isFetching: false,
  //       screenshots: uploadedScreenshots,
  //       favorites: uploadedScreenshots.reduce((acc, screenshot) => {
  //         return acc.concat(screenshot.favorites)
  //       }, [])
  //     }
  //   default:
  //     return state
  // }
}
