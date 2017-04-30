import ReactGA from 'react-ga'

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-97498182-1')
}

export const logPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }
}
