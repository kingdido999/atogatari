import ReactGA from 'react-ga'

ReactGA.initialize('UA-97498182-1')

export const logPageView = () => {
	ReactGA.set({ page: window.location.pathname })
	ReactGA.pageview(window.location.pathname)
}
