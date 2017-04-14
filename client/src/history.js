import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { resetErrorMessageIfNeeded } from './actions/common'
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

history.listen(() => {
  store.dispatch(resetErrorMessageIfNeeded())

  // This hack aims to fix the follwing issue:
  //
  // While the Zooming instance is open, any route change will not close 
  // the instance properly, which results in unclickable page. 
  // Manually check and remove the overlay if necessary.
  const lastElement = document.body.lastElementChild

  if (lastElement.tagName === 'DIV' && lastElement.style.zIndex === '998') {
    document.body.removeChild(lastElement)
  }
})

export default history