import styles from './Trailer.module.scss';
import { Cancel } from '@mui/icons-material';

const Trailer = ({trailer, showTrailer, handleTrailer}) => {
    return (
        <div className={showTrailer ? `${styles.detail_trailer} ${styles.visible}` : `${styles.detail_trailer} ${styles.hidden}`}>
            <div className={styles.wrapper}>
                <button onClick={handleTrailer}
                    className={styles.cancel}>
                    <Cancel />
                </button>
                {
                    trailer !== null ?
                        <iframe className={styles.detail_video} src={showTrailer ? `https://www.youtube.com/embed/${trailer}` : ``} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> :
                        <div className={styles.not_av}>
                            <h1>Trailer Not Found!</h1>
                        </div>
                }

            </div>
        </div>
    )
}

export default Trailer;