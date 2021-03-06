import { useEffect } from 'react'
import Head from "next/head"
import { useDispatch } from 'react-redux'
import { makeLogoBig, activeNavItem } from '../redux/navActiveSlice'
import { HomeHero } from "../components"

export default function Home({ trending }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(makeLogoBig())
    dispatch(activeNavItem('home'))
  }, [dispatch])

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>CINE | Live cinematic information</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#278EA5" />

        <meta name="title" content="CINE | Live cinematic information" />
        <meta name="description"
          content="A website that provides you cinematic data with stunning UI. Torrents for movies are also available and just a touch to download them." />
        <meta name="keywords"
          content="cine, cinema, cinematic, information, movies, series, tv shows, tv, shows, torrents, tmdb, yts, download movies" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="TeNyain Moe Lwin" />

        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content="CINE | Live cinematic information" />
        <meta name="description"
          content="A website that provides you cinematic data with stunning UI. Torrents for movies are also available and just a touch to download them." />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cine-next.vercel.app/" />
        <meta property="og:title" content="CINE | Live cinematic information" />
        <meta property="og:description"
          content="A website that provides you cinematic data with stunning UI. Torrents for movies are also available and just a touch to download them." />
        <meta property="og:image" content="meta.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cine-next.vercel.app/" />
        <meta property="twitter:title" content="CINE | Live cinematic information" />
        <meta property="twitter:description"
          content="A website that provides you cinematic data with stunning UI. Torrents for movies are also available and just a touch to download them." />
        <meta property="twitter:image" content="meta.png" />
      </Head>

      <HomeHero
        trending={trending}
      />
    </div>
  )
}

export async function getStaticProps(context) {

  const getTrending = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`).then(res => res.json()).then(data => data.results).catch((err) => 'Error loading');

  return {
    props: {
      trending: getTrending
    },
  }
}
