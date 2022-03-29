import styles from './DetailImages.module.scss';
import Image from 'next/image';
import { nanoid } from '@reduxjs/toolkit';
import { ArrowCircleRight } from '@mui/icons-material';

const DetailImages = ({ data }) => {

    // console.log(data)

    let backdrops, backdropsList;
    if(data){

        if (data.backdrops.length >= 5) {
            backdrops = data.backdrops.slice(0, 5);
        } else {
            backdrops = data.backdrops;
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