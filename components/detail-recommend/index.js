import styles from './DetailRecommend.module.scss';
import Link from 'next/link';

const DetailRecommend = ({data, route_type}) => {

    let recommend, recommendList;

    if(data) {
        if(data.results.length >= 10) {
            recommend = data.results.slice(0,8);
        }else {
            recommend = data.results;
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