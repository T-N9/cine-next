import { configureStore } from "@reduxjs/toolkit";
import navActiveReducer from './navActiveSlice';
import trendingAllReducer from './trendingAllSlice';
import detailMovieTVReducer from './detailMovieTVSlice';
import searchResultsReducer from './searchResultsSlice';
import searchActiveReducer from "./searchActiveSlice";
import theatreMoviesReducer from './theatreMoviesSlice';
import upcomingMoviesReducer from './upcomingMovieSlice';

export const store = configureStore({
    reducer: {
        navActivate: navActiveReducer,
        trending_all : trendingAllReducer,
        detail_movie_tv : detailMovieTVReducer,
        searchResults : searchResultsReducer,
        searchActive : searchActiveReducer,
        theatreMovies : theatreMoviesReducer,
        upcoming_movies : upcomingMoviesReducer
    },
})