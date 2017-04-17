import { createSelector } from 'reselect'

const getFavorites = (state) => state.entities.favorites

export const getUserFavorites = (state, props) => {
  const { userFavorites } = state
  const { params } = props
  const { userId } = params
  return userFavorites[userId]
}

export const getUserScreenshots = (state, props) => {
  const { userScreenshots } = state
  const { params } = props
  const { userId } = params
  return userScreenshots[userId]
}

export const getTagScreenshotIds = (state, props) => {
  const { entities } = state
  const { tags } = entities
  const { name } = props.params
  const tag = tags[name]

  return tag ? tag.screenshots : []
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