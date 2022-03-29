import styles from './DetailCredit.module.scss'
import CastCard from './CastCard';
import CrewCard from './CrewCard';
import { nanoid } from '@reduxjs/toolkit';
import { CircularProgress } from '@mui/material';
import { ArrowCircleRight } from '@mui/icons-material';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// import required modules
import { FreeMode } from "swiper";

const DetailCredit = ({ data }) => {

    // console.log(data);
    const getCasts = data.cast;
    const getCrews = data.crew;

    let castsList, crewsList;

    let castsToShow,
        crewsToShow = [];
    if (getCasts.length > 11) {
        castsToShow = getCasts.slice(0, 11);
    } else {
        castsToShow = getCasts;
    }

    //  To Crews
    getCrews.filter(item => {
        item.job === 'Director' && crewsToShow.push(item);
        return item.job === 'Director';
    });

    getCrews.filter(item => {
        item.job === 'Producer' && crewsToShow.push(item);
        return item.job === 'Producer';
    })

    getCrews.filter(item => {
        item.job === 'Novel' && crewsToShow.push(item);
        return item.job === 'Novel';
    })

    getCrews.filter(item => {
        item.job === 'Characters' && crewsToShow.push(item);
        return item.job === 'Characters';
    })

    getCrews.filter(item => {
        item.job === 'Writer' && crewsToShow.push(item);
        return item.job === 'Writer';
    })

    getCrews.filter(item => {
        item.job === 'Executive Producer' && crewsToShow.push(item);
        return item.job === 'Executive Producer';
    })

    castsList = castsToShow.map(item => {
        return (
            <SwiperSlide
                key={item.name}
            >
                <CastCard
                    name={item.name}
                    profile_path={item.profile_path}
                    image={`https://www.themoviedb.org/t/p/w138_and_h175_face/${item.profile_path}`}
                    character={item.character}
                />
            </SwiperSlide>
        )
    });

    crewsList = crewsToShow.map(item => {
        return (
            <SwiperSlide
                key={nanoid()}
            >
                <CrewCard

                    image={item.profile_path}
                    name={item.name}
                    department={item.department}
                    job={item.job}
                />
            </SwiperSlide>

        )
    });

    return (
        <>
            <section className={styles.detail_casts}>
                <div className={`${styles.container_x_md}`}>
                    <h1 className={styles.title_2}>Top Casts</h1>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        modules={[FreeMode]}
                        className="mySwiper"
                        breakpoints={{
                            1366: {
                                "slidesPerView": 9,
                                "spaceBetween": -20,
                            },
                            1024: {
                                "slidesPerView": 6,
                                "spaceBetween": 10,
                            },
                            768: {
                                "slidesPerView": 5,
                                "spaceBetween": 10,
                            },
                        }}
                    >
                        {castsList}

                        <SwiperSlide
                        >
                            <div className={styles.view_credits}>
                                <p>View all credits</p>

                                <ArrowCircleRight />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
            <section className={styles.detail_crews}>
                <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                    <h1 className={styles.title_2}>Top Crews</h1>
                    <Swiper
                        slidesPerView={1.5}
                        spaceBetween={5}
                        freeMode={true}
                        modules={[FreeMode]}
                        className="mySwiper"
                        breakpoints={{
                            1366: {
                                "slidesPerView": 6,
                                // "spaceBetween" : ,
                            },
                            1024: {
                                "slidesPerView": 5,
                                // "spaceBetween" : 10,
                            },
                            768: {
                                "slidesPerView": 3,
                                // "spaceBetween" : 10,
                            },
                        }}
                    >
                        {crewsList}
                        <SwiperSlide
                        >
                            <div className={styles.view_credits}>
                                <p>View all credits</p>

                                <ArrowCircleRight />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default DetailCredit;