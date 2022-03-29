import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import useSWR from "swr";
import { CircularProgress } from "@mui/material";
import { InsertPhoto, AccessTimeSharp, StarRateRounded, People } from '@mui/icons-material';
import styles from './DetailHero.module.scss';
import Torrent from './Torrent';
import Button from '@mui/material/Button';
import Trailer from './Trailer';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const DetailHero = ({ id, media_type }) => {

    const [showTrailer, setShowTrailer] = useState(false);
    const [getData, setGetData] = useState(null);

    let urlLink;
    if (media_type === 'movie') {
        urlLink = `https://api.themoviedb.org/3/movie/${id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases`;
    } else {
        urlLink = `https://api.themoviedb.org/3/tv/${id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases,content_ratings`;
    }

    const { data, error } = useSWR(urlLink, fetcher);

    useEffect(() => {
        if(data){
            setGetData(data)
        }
        
    }, [data])

    let title, backdrop_path, poster_path, release_date, overview;
    let release_year;
    let content_rating, content_rating_US;
    let genres = [];
    let runtime, status, no_rate;
    let tagline, rating, popularity, imdb_id;
    let trailer, trailer_official;

    if (getData !== null) {

        /* =====================================
        Title, background, poster, release year, overview
        ===================================== */
        title = getData.name ? getData.name : getData.original_title;
        backdrop_path = `https://www.themoviedb.org/t/p/w780/${getData.backdrop_path}`;
        poster_path = `https://www.themoviedb.org/t/p/w342/${getData.poster_path}`;
        release_date = getData.release_date;
        overview = getData.overview;

        /* =====================================
        Content Rating
        ===================================== */
        const findOtherRatings_tv = () => {
            let getRating = getData.content_ratings.results;
            let i = 1;
            do {
                content_rating = getRating[getRating.length - i].rating;
                i++;
            } while (content_rating === '');
        }

        const findOtherRatings_movie = () => {
            let getRating = getData.releases.countries;
            let i = 1;
            if (getData.releases.countries === []) {
                do {
                    content_rating = getRating[getRating.length - i].certification;
                    i++;
                } while (content_rating === '');
            } else {
                content_rating = '';
            }
        }

        if (media_type === 'movie') {
            function checkMovieRating() {
                let rating_arr = [];
    
                content_rating_US = getData.releases.countries.filter(item => {
                    return (item.iso_3166_1 === "US")
                });
    
                content_rating_US.map(item => rating_arr.push(item.certification));
    
                let check = (list) => list.every(item => list.indexOf(item) === 0);
    
                if (content_rating_US.length === 0) {
                    findOtherRatings_movie();
                } else {
                    if (content_rating_US.length === 1) {
                        content_rating = content_rating_US[0].certification;
                    } else {
    
                        if (check(rating_arr) && rating_arr[0] === '') {
                            content_rating = '';
                        } else {
                            let i = 1;
                            do {
                                content_rating = content_rating_US[content_rating_US.length - i].certification;
                                i++;
                            } while (content_rating === '');
                        }
                    }
                }
            }
            getData.releases.countries !== [] ?
                checkMovieRating() :
                content_rating = '';
        }else{
            if (getData.content_ratings.results.length > 0) {
                content_rating_US = getData.content_ratings.results.filter(item => {
                    return (item.iso_3166_1 === 'US')
                });

                if (content_rating_US.length === 0) {
                    findOtherRatings_tv();
                } else {
                    let i = 1;
                    do {
                        content_rating = content_rating_US[content_rating_US.length - i].rating;
                        i++;
                    } while (content_rating === '');
                }

            } else {
                content_rating = '';
            }
        }

        /* =====================================
        Genres
        ===================================== */

        getData.genres.map(item => {
            return (
                genres.push(item.name)
            )
        });

        /* =====================================
        Runtime, status, no_rate
        ===================================== */
        let first_air_date, episode_run_time;

        runtime = getData.runtime;
        status = getData.status;
        first_air_date = getData.first_air_date;
        episode_run_time = getData.episode_run_time;

        if (backdrop_path !== undefined && poster_path !== undefined) {
            release_date !== "" ?
                release_year = release_date ? release_date.substring(0, 4) : first_air_date.substring(0, 4) :
                release_year = "Unknown"

            function timeConvert(n) {
                var num = n;
                var hours = (num / 60);
                var rhours = Math.floor(hours);
                var minutes = (hours - rhours) * 60;
                var rminutes = Math.round(minutes);
                return rhours + "h " + rminutes + "m";
            }

            no_rate = "NR";

            runtime = runtime ? timeConvert(runtime) : `${episode_run_time}m`;
        }

        /* =====================================
        Tagline, rating, popularity, imdb_id
        ===================================== */

        tagline = getData.tagline;
        rating = getData.vote_average;
        popularity = getData.popularity;
        imdb_id = getData.imdb_id;

        /* =====================================
            Trailer
        ===================================== */

        
        if (getData.videos.results.length > 0) {
            trailer_official = getData.videos.results.filter(item => {
                return (item.type === 'Trailer' && item.official === true)
            });

            if (trailer_official.length === 0) {
                trailer_official = getData.videos.results.filter(item => {
                    if (item.type === 'Trailer') {
                        return (item.type === 'Trailer')
                    }
                    else {
                        return (item);
                    }

                });
            }

            if (trailer_official[0]) {
                trailer = trailer_official[0].key;
            } else {
                trailer = null;
            }

        } else {
            trailer = null;
        }
    }

    const handleTrailer = () => {
        setShowTrailer(prev => !prev);
    }

    if (error) return (
        <section className={styles.info_loading_error}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    )
    if (!data) return (
        <section className={styles.info_loading_error}>
            <CircularProgress />
        </section>
    )

    return (
        <>
            <section
                className={styles.detail_hero}
                style={{ backgroundImage: `url(${backdrop_path})` }}
            >
                <div className={styles.detail_wrapper}>
                    <div className={styles.d_none}>

                    </div>
                    <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                        <div className={styles.flex_section}>
                            <div className={styles.detail_poster}>
                                {
                                    poster_path ?
                                        <Image src={`${poster_path}`} alt={`${title} poster`} layout='fill' priority /> :
                                        <div className={`${styles.detail_poster} ${styles.placeholder}`}>
                                            <InsertPhoto />
                                        </div>
                                }
                            </div>
                            <div className={styles.detail_movie_content}>
                                <div className={styles.detail_header}>
                                    <h1 className={styles.title}>{title}
                                        <span className={styles.year}>( {release_year} )</span>
                                    </h1>
                                </div>
                                <div className={styles.detail_neck}>
                                    {
                                        content_rating &&
                                        <div className={styles.content_rating}>
                                            <p>{content_rating}</p>
                                        </div>
                                    }
                                    <p className={styles.genres}>
                                        {
                                            genres.map(item => {
                                                let type = item === 'Science Fiction' ? 'Sci-fi' : item
                                                return (
                                                    <Link key={item} href={`/discover/movies/${type.toLowerCase()}`}>
                                                        <span className={styles.genre}>{type}</span>
                                                    </Link>
                                                )
                                            }
                                            )}
                                    </p>
                                    {
                                        (runtime !== 'm' && runtime !== 'undefinedm') &&
                                        <p className={styles.runtime}>
                                            <AccessTimeSharp />
                                            {runtime}
                                        </p>
                                    }
                                    {
                                        status === "In Production" &&
                                        <p className={styles.coming_soon}>
                                            Coming Soon
                                        </p>
                                    }
                                </div>
                                {
                                    tagline &&
                                    <div className={styles.tagline}>
                                        <p>
                                            " {tagline} "
                                        </p>
                                    </div>
                                }
                                <div className={styles.overview}>
                                    <h1>Overview</h1>
                                    <p>
                                        {overview}
                                    </p>
                                </div>
                                <div className={styles.info}>
                                    <div>
                                        <span className={styles.icon}>
                                            <StarRateRounded />
                                        </span>
                                        <h1>
                                            {rating === 0 ? no_rate : rating}
                                        </h1>
                                    </div>

                                    <div>
                                        <span className={styles.icon}>
                                            <People />
                                        </span>
                                        <h1>
                                            {popularity}
                                        </h1>
                                    </div>
                                </div>
                                <Button onClick={handleTrailer} variant='outlined' className={styles.trailer_btn}>
                                    View Trailer
                                </Button>

                                {
                                    ((title && release_year) && media_type === 'movie') &&
                                    (

                                        <Torrent
                                            title={title}
                                            year={release_year}
                                            imdb_id={imdb_id}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Trailer
                    trailer={trailer}
                    showTrailer={showTrailer}
                    handleTrailer={handleTrailer}
                />
            </section>
        </>
    )
}

export default DetailHero;