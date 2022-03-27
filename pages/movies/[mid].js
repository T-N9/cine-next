import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { makeLogoSmall } from '../../redux/navActiveSlice'
import { DetailHero } from '../../components';

const MoviePage = ({movie, casts}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(makeLogoSmall())
    }, [dispatch])

    

    // const router = useRouter();
    // const { mid } = router.query;
    // console.log(movie, casts);

    return (
        <>
            <DetailHero
                data = {movie}
            />
        </>
    )
}

export default MoviePage;

export async function getServerSideProps(context) {

    const { mid } = context.params;

    const getMovie = await fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases`).then(res => res.json()).then(data => data);

    const getCasts = await fetch(`https://api.themoviedb.org/3/movie/${mid}/credits?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`).then(res => res.json()).then(data => data);


    return {
      props: {
          movie : getMovie,
          casts : getCasts
      }, // will be passed to the page component as props
    }
  }