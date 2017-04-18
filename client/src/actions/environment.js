import { makeActionCreator } from '../utils'

const changeIsMobile = makeActionCreator('CHANGE_IS_MOBILE', 'isMobile')
export const changeWidthAndHeight = makeActionCreator(
  'CHANGE_WIDTH_AND_HEIGHT',
  'height',
  'width'
)

export function initEnvironment() {
  return dispatch => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

    dispatch(changeIsMobile(isMobile))
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth))

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth))
    }
  }
}
