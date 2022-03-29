import { useEffect } from 'react';
import styles from '../Pages.module.scss';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { makeLogoSmall , activeNavItem } from '../../redux/navActiveSlice'
import { DetailCredit, DetailHero, DetailImages, DetailVideos, DetailInfo, DetailRecommend } from '../../components';

const MoviePage = ({ id, movie }) => {

    const media_type = 'movie';

    const title = movie.original_title;
    const backdrop_path = `https://www.themoviedb.org/t/p/w780/${movie.backdrop_path}`;
    const overview = movie.overview;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(makeLogoSmall());
        dispatch(activeNavItem("movies"));
    }, [dispatch]);

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
                id = {id}
                media_type={media_type}
            />
            <DetailCredit
                id = {id}
                media_type={media_type}
            />
            <div className={`${styles.flex_media} ${styles.container_x_md} ${styles.container_y_2}`}>
                <div className={styles.media_wrapper}>
                    <DetailImages
                        id = {id}
                        media_type={media_type}
                    />
                    <DetailVideos
                        id = {id}
                        media_type={media_type}
                    />
                </div>
                <DetailInfo
                    id = {id}
                    media_type={media_type}
                />
            </div>
            <DetailRecommend
                id = {id}
                route_type='movie'
                media_type={media_type}
            />
        </>
    )
}

export default MoviePage;

export async function getServerSideProps(context) {

    const { mid } = context.params;

    const getMovie = await fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`).then(res => res.json()).then(data => data);


    return {
      props: {
        id : mid,
        movie : getMovie
      }, // will be passed to the page component as props
    }
  }