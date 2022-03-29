import styles from './DetailVideos.module.scss';
import { nanoid } from '@reduxjs/toolkit';
import { ArrowCircleRight } from '@mui/icons-material';

const DetailVideo = ({ data }) => {

    let trailers, trailersList;

    if (data) {

        if (data.results.length >= 3) {
            trailers = data.results.slice(0, 3);
        } else {
            trailers = data.results;
        }

        trailersList = trailers.map(item => {
            return (
                <div key={nanoid()}>
                    <iframe className={styles.media_video} src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            )
        })
    }
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