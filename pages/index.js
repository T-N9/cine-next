import { useEffect } from 'react'
import Head from "next/head"
import { useDispatch } from 'react-redux'
import { makeLogoBig } from '../redux/navActiveSlice'
import { HomeHero } from "../components"

export default function Home({trending}) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(makeLogoBig())
  }, [dispatch])

  return (
    <div>
      <Head>
      <title>CINE | Live cinematic information</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <HomeHero
        trending = {trending}
      />
    </div>
  )
}

export async function getStaticProps(context) {

  const getTrending = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`).then(res => res.json()).then(data => data.results);

  return {
    props: {
        trending : getTrending
    }, 
  }
}
