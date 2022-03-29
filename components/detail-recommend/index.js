import { useState, useEffect } from 'react';
import useSWR from 'swr';
import styles from './DetailRecommend.module.scss';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const DetailRecommend = ({id, route_type,}) => {

    const [ getData, setGetData ] = useState(null);
    const { data, error } = useSWR(`https://api.themoviedb.org/3/${route_type}/${id}/recommendations?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`, fetcher);

    useEffect(()=> {
        if(data) {
            setGetData(data);
        }
    }, [data]);

    let recommend, recommendList;

    if(getData !== null) {
        if(getData.results.length >= 10) {
            recommend = getData.results.slice(0,8);
        }else {
            recommend = getData.results;
        }

        recommendList = recommend.map(item => {
            return (
                <div key={item.id} className={styles.recommend_item}>
                    <Link href={`/${route_type === 'movie' ? 'movies' : 'series'}/${item.id}`}>
                       <a>
                            <img className={styles.image} src={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${item.backdrop_path}`} alt={item.name} />
                            
                            <div className={styles.content}>
                                <h1 className={styles.title}>
                                    {item.title ? item.title : item.name}
                                
                                </h1>
                                <h1 className={styles.vote}>
                                    {item.vote_average.toFixed(1)}
                                </h1>
                            </div>
                       </a>
                    </Link>
                </div>
            )
        });

        if(recommend.length === 0) {
            recommendList = null;
        }
    }

    if (error) return (
        <section className={styles.loading_error}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    )
    if (!data) return (
        <section className={styles.loading_error}>
            <CircularProgress />
        </section>
    )

    return(
        <>
            <section className={styles.recommend_section}>
                <div className={`${styles.container_y_2} ${styles.container_x_md}`}>
                    <h1 className={styles.title_2}>
                        Recommended
                        { route_type === 'movie' ? ' Movies' : ' Shows'}
                    </h1>
                    <div className={styles.recommend_wrapper}>
                        { recommendList === null ? <p>No recommendations for now.</p> : recommendList }
                    </div>
                </div>
            </section>   
        </>
    )
}

export default DetailRecommend;