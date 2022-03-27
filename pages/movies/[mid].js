import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { makeLogoSmall } from '../../redux/navActiveSlice'
import { DetailHero } from '../../components';

const MoviePage = ({movie, casts}) => {

    const title = movie.original_title;
    const backdrop_path = `https://www.themoviedb.org/t/p/w342/${movie.backdrop_path}`;
    const overview = movie.overview;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(makeLogoSmall())
    }, [dispatch])

    

    // const router = useRouter();
    // const { mid } = router.query;
    // console.log(movie, casts);

    return (
        <>
           <Head>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description"
                    content={overview} />
                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://cine-next.vercel.app/movies/${movie.id}`} />
                <meta property="og:title" content={title} />
                <meta property="og:description"
                    content={overview} />
                <meta property="og:image" content={backdrop_path} />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://cine-next.vercel.app/movies/${movie.id}` }/>
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description"
                    content={overview} />
                <meta property="twitter:image" content={backdrop_path} />
            </Head>
            <DetailHero
                data = {movie}
            />
        </>
    )
}

export default MoviePage;

export async function getServerSideProps(context) {

    const { mid } = context.params;

    const getMovie = await fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases`).then(res => res.json()).then(data => data);

    const getCasts = await fetch(`https://api.themoviedb.org/3/movie/${mid}/credits?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`).then(res => res.json()).then(data => data);


    return {
      props: {
          movie : getMovie,
          casts : getCasts
      }, // will be passed to the page component as props
    }
  }