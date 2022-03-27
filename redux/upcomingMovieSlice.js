import { createSlice } from "@reduxjs/toolkit";

export const upcomingMoviesSlice = createSlice({
    name : 'upcoming_movies',
    initialState : {
        upcomingMoviesData : null
    },
    reducers : {
        setUpcomingMovieData : (state , {payload}) => {
            state.upcomingMoviesData = payload;
        }
    }
});

export const { setUpcomingMovieData } = upcomingMoviesSlice.actions;
export default upcomingMoviesSlice.reducer;

