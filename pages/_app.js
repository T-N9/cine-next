import { useEffect} from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.scss'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { NavBar } from '../components'
import { Progress } from '../components'
import { useProgressStore } from '../store';

function MyApp({ Component, pageProps }) {

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
  const isAnimating = useProgressStore((state)=> state.isAnimating);
  const router = useRouter(); 

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    }

    const handleStop = () => {
      setIsAnimating(false);
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
    router.events.off('routeChangeComplete', handleStop);
    router.events.off('routeChangeError', handleStop);
    }
  }, [router])
  return (
  <Provider store={store}>
    <NavBar/>
    <Progress isAnimating={isAnimating}/>
    <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
