import { useState, useEffect } from 'react';
import styles from './DetailImages.module.scss';
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import { nanoid } from '@reduxjs/toolkit';
import { ArrowCircleRight } from '@mui/icons-material';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const DetailImages = ({ id, media_type }) => {

    const [ getData, setGetData ] = useState(null);
    const { data, error } = useSWR(`https://api.themoviedb.org/3/${media_type}/${id}/images?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`, fetcher);

    useEffect(()=> {
        if(data) {
            setGetData(data);
        }
    }, [data]);

    let backdrops, backdropsList;

    if(getData !== null) {

        if (getData.backdrops.length >= 5) {
            backdrops = getData.backdrops.slice(0, 5);
        } else {
            backdrops = getData.backdrops;
        }
    
        backdropsList = backdrops.map(item => {
            return (
                <div key={nanoid()} className={styles.backdrop_item}>
                    <div className={styles.image}>
                        <Image  src={`https://image.tmdb.org/t/p/w500${item.file_path}`} layout="fill" alt="backdrops" />
                    </div>
                    
                </div>
            )
        });   
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
            <h1 className={styles.title_2}>
                Related Media
            </h1>
            <section className={styles.backdrops}>

                {backdropsList}
                <div key={nanoid()} className={`${styles.backdrop_item} ${styles.view_more}`}>
                    <p>
                        View More
                    </p>

                    <ArrowCircleRight />
                </div>
            </section>   </>
    )
}

export default DetailImages;