import { useState, useEffect }  from 'react';
import useSWR from 'swr';
import styles from './DetailVideos.module.scss';
import { nanoid } from '@reduxjs/toolkit';
import { CircularProgress } from '@mui/material';
import { ArrowCircleRight } from '@mui/icons-material';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const DetailVideo = ({ id, media_type }) => {

    const [ getData, setGetData ] = useState(null);
    const { data, error } = useSWR(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`, fetcher);

    useEffect(()=> {
        if(data) {
            setGetData(data);
        }
    }, [data]);

    let trailers, trailersList;

    if(getData !== null){

        if (getData.results.length >= 3) {
            trailers = getData.results.slice(0, 3);
        } else {
            trailers = getData.results;
        }

        trailersList = trailers.map(item => {
            return (
                <div key={nanoid()}>
                    <iframe className={styles.media_video} src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            )
        })
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

    return (
        <>
            <section className={styles.videos_list}>
                {trailersList}
                <div key={nanoid()} className={styles.view_more}>
                    <p>
                        View More
                    </p>

                    <ArrowCircleRight />
                </div>
            </section>
        </>
    )
}

export default DetailVideo;