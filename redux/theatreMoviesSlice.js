import { createSlice } from "@reduxjs/toolkit";

export const theatreMoviesSlice = createSlice({
    name : 'theatreMoives',
    initialState : {
        theatreMoviesData : null
    },
    reducers : {
        setTheatreMovies : (state, {payload}) => {
            state.theatreMoviesData = payload;
        }
    }
});

export const { setTheatreMovies } = theatreMoviesSlice.actions;
export default theatreMoviesSlice.reducer;