import { useEffect } from 'react';
import styles from '../Pages.module.scss';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { makeLogoSmall , activeNavItem } from '../../redux/navActiveSlice'
import { DetailCredit, DetailHero, DetailImages, DetailVideos, DetailInfo, DetailRecommend } from '../../components';

const SeriesPage = ({ id, series }) => {

    const media_type = 'tv';

    const title = series.original_title;
    const backdrop_path = `https://www.themoviedb.org/t/p/w780/${series.backdrop_path}`;
    const overview = series.overview;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(makeLogoSmall());
        dispatch(activeNavItem("series"));
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
                <meta property="og:url" content={`https://cine-next.vercel.app/movies/${series.id}`} />
                <meta property="og:title" content={title} />
                <meta property="og:description"
                    content={overview} />
                <meta property="og:image" content={backdrop_path} />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://cine-next.vercel.app/movies/${series.id}` }/>
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
                route_type='tv'
                media_type={media_type}
            />
        </>
    )
}

export default SeriesPage;

export async function getServerSideProps(context) {

    const { sid } = context.params;

    const getSeries = await fetch(`https://api.themoviedb.org/3/tv/${sid}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases,content_ratings`).then(res => res.json()).then(data => data);


    return {
      props: {
        id : sid,
        series : getSeries
      }, // will be passed to the page component as props
    }
  }