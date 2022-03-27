// import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { InsertPhoto , AccessTimeSharp, StarRateRounded, People } from '@mui/icons-material';
import styles from './DetailHero.module.scss';
import Torrent from './Torrent';
import Button from '@mui/material/Button';

const DetailHero = ({ data }) => {

    /* =====================================
        Title, background, poster, release year, overview
    ===================================== */

    const title = data.original_title;
    const backdrop_path = `https://www.themoviedb.org/t/p/w342/${data.backdrop_path}`;
    const poster_path = `https://www.themoviedb.org/t/p/w342/${data.poster_path}`;
    const release_date = data.release_date;
    const overview = data.overview;

    let release_year;
    

    /* =====================================
        Content Rating
    ===================================== */
    let content_rating, content_rating_US;

    const findOtherRatings_movie = () => {
        let getRating = data.releases.countries;
        let i = 1;
        if (data.releases.countries === []) {
            do {
                content_rating = getRating[getRating.length - i].certification;
                i++;
            } while (content_rating === '');
        } else {
            content_rating = '';
        }
    }

    function checkMovieRating() {
        let rating_arr = [];

        content_rating_US = data.releases.countries.filter(item => {
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
    data.releases.countries !== [] ?
        checkMovieRating() :
        content_rating = '';

    /* =====================================
        Genres
    ===================================== */
    let genres = [];
    data.genres.map(item => {
        return (
            genres.push(item.name)
        )
    });

    /* =====================================
        Runtime, status, no_rate
    ===================================== */

    let runtime = data.runtime;
    let status = data.status;

    let no_rate;
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

        runtime = runtime ? timeConvert(runtime) : `Unavailable`;
    }

    const tagline = data.tagline;
    const rating = data.vote_average;
    const popularity = data.popularity;
    const imdb_id = data.imdb_id;

    const handleTrailer = () => {
        console.log('Trailer')
    }

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
                                    poster_path !== null ?
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
                                    (title && release_year) &&
                                    (
                                        
                                        <Torrent
                                            title ={title}
                                            year = {release_year}
                                            imdb_id = {imdb_id}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default DetailHero;