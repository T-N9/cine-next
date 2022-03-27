import styles from './SlideItem.module.scss'
import Link from "next/link"
import { Button } from "@mui/material"

const SlideItem = (props) => {

    const { id, title , index , name, media_type, overview, backdrop_path } = props;

    let route_type = media_type === 'tv' ? 'series' : 'movies';


    return (
        <div className={styles.slide_item} style={{backgroundImage : `url(https://www.themoviedb.org/t/p/original/${backdrop_path})`}}>
            <div className={`${styles.container_x_md} ${styles.slide_wrapper}`}>
                <div className={styles.slide_content}>
                    <p className={styles.top_list}>Top <span className={styles.top_num}>{index+1}</span> on board</p>
                    <h1 className={styles.title_1}>
                        {title ? title : name}
                    </h1>

                    <p className={styles.overview}>
                    {overview}
                    </p>

                    <Link href={`/${route_type}/${id}`}>
                        <Button variant='contained' className={styles.button}>
                            View Detail
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SlideItem