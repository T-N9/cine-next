import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import styles from '../Pages.module.scss';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { makeLogoSmall , activeNavItem } from '../../redux/navActiveSlice'
import { DetailCredit, DetailHero, DetailImages, DetailVideos, DetailInfo, DetailRecommend } from '../../components';

const MoviePage = ({movie, casts, images, videos, recommend}) => {

    // console.log(casts)

    const title = movie.original_title;
    const backdrop_path = `https://www.themoviedb.org/t/p/w342/${movie.backdrop_path}`;
    const overview = movie.overview;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(makeLogoSmall());
        dispatch(activeNavItem("movies"));
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
            <DetailCredit
                data = {casts}
            />
            <div className={`${styles.flex_media} ${styles.container_x_md} ${styles.container_y_2}`}>
                <div className={styles.media_wrapper}>
                    <DetailImages
                        data={images}
                    />
                    <DetailVideos
                        data={videos}
                    />
                </div>
                <DetailInfo
                    data={movie}
                />
            </div>
            <DetailRecommend
                data = {recommend}
                route_type='movie'
            />
        </>
    )
}

export default MoviePage;

export async function getServerSideProps(context) {

    const { mid } = context.params;

    const getMovie = await fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases,external_ids,keywords`).then(res => res.json()).then(data => data);

    const getCasts = await fetch(`https://api.themoviedb.org/3/movie/${mid}/credits?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`).then(res => res.json()).then(data => data);

    const getImages = await fetch(`https://api.themoviedb.org/3/movie/${mid}/images?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`).then(res => res.json()).then(data => data);

    const getVideos = await fetch(`https://api.themoviedb.org/3/movie/${mid}/videos?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`).then(res => res.json()).then(data => data);

    const getRecommend = await fetch(`https://api.themoviedb.org/3/movie/${mid}/recommendations?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`).then(res => res.json()).then(data => data);


    return {
      props: {
          movie : getMovie,
          casts : getCasts,
          images : getImages,
          videos : getVideos,
          recommend : getRecommend
      }, // will be passed to the page component as props
    }
  }