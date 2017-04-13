import { createSelector } from 'reselect'

const getNSFW = (state) => state.screenshots.nsfw
const getSortBy = (state) => state.screenshots.sortBy

const getScreenshots = (state) => state.entities.screenshots
const getScreenshotIds = (state) => state.screenshots.ids
const getFavorites = (state) => state.entities.favorites

const getUserFavorites = (state, props) => {
  const { userFavorites } = state
  const { params } = props
  const { userId } = params
  return userFavorites[userId]
}

const getUserScreenshots = (state, props) => {
  const { userScreenshots } = state
  const { params } = props
  const { userId } = params
  return userScreenshots[userId]
}

const getTagScreenshotIds = (state, props) => {
  const { entities } = state
  const { tags } = entities
  const { name } = props.params
  const tag = tags[name]

  return tag ? tag.screenshots : []
}

const filterScreenshotIds = (screenshots, screenshotIds, nsfw, sortBy) => {
    return screenshotIds
      .filter(id => {
        if (nsfw) return true
        return screenshots[id].nsfw === false
      })
      .sort((i, j) => {
        if (sortBy === 'date') {
          const dateI = new Date(screenshots[i].createdAt)
          const dateJ = new Date(screenshots[j].createdAt) 

          if (dateI > dateJ) return -1
          if (dateI < dateJ) return 1
          return 0
        }

        if (sortBy === 'popularity') {
          const scoreI = screenshots[i].favorites.length
          const scoreJ = screenshots[j].favorites.length
          return scoreJ - scoreI
        }

        return 0
      })
  }

export const getUserFavoriteScreenshotIds = createSelector(
  [ getUserFavorites, getFavorites ],
  (userFavorites, favorites) => {
    return userFavorites
      ? userFavorites.ids.map(favoriteId => favorites[favoriteId].screenshot)
      : []
  }
)

export const getUserScreenshotIds = createSelector(
  [ getUserScreenshots ],
  (userScreenshots) => {
    return userScreenshots
    ? userScreenshots.ids
    : []
  }
)

export const getFilteredUserFavoriteScreenshotIds = createSelector(
  [ getScreenshots, getUserFavoriteScreenshotIds, getNSFW, getSortBy ],
  filterScreenshotIds
)

export const getFilteredUserScreenshotIds = createSelector(
  [ getScreenshots, getUserScreenshotIds, getNSFW, getSortBy ],
  filterScreenshotIds
)

export const getFilteredScreenshotIds = createSelector(
  [ getScreenshots, getScreenshotIds, getNSFW, getSortBy ],
  filterScreenshotIds
)

export const getFilteredTagScreenshotIds = createSelector(
  [ getScreenshots, getTagScreenshotIds, getNSFW, getSortBy ],
  filterScreenshotIds
)
