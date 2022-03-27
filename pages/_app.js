import '../styles/globals.scss'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { NavBar } from '../components'

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <NavBar/>
    <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
