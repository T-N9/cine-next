import styles from './HomeHero.module.scss';
import SlideItem from './SlideItem';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination"
import SwiperCore, {
    Autoplay, Pagination, Navigation
} from 'swiper';
SwiperCore.use([Autoplay, Pagination, Navigation]);

const HomeHero = ({trending}) => {

    const slideItems = trending.slice(0,5).map(item => {

        const { id, backdrop_path, title, overview, name, media_type } = item;
        return (
            <SwiperSlide key={id}>
                <SlideItem
                    id = {id}
                    index = {trending.indexOf(item)}
                    backdrop_path={backdrop_path}
                    title={title}
                    overview={overview}
                    name={name}
                    media_type = {media_type}
                />
            </SwiperSlide>
        )
    })
    
    return (
        <section className={styles.home_hero}>
            <div>
                <div>
                    <Swiper
                        className="mySwiper"
                        loop={true}
                        pagination={{
                            "clickable": true
                        }}
                        autoplay={{
                            "delay": 10000,
                            "disableOnInteraction": false
                        }}
                        speed={400}
                        breakpoints={{
                            1366 : {
                                "speed" : 800
                            }
                        }}
                    >
                        {
                            slideItems
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    )
}


export default HomeHero



