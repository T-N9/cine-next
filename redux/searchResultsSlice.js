import { createSlice } from '@reduxjs/toolkit';

export const searchResultsSlice = createSlice({
    name : 'searchResults',
    initialState : {
        currentPage: 1,
        movies : 0,
        series : 0,
        crews : 0
    },
    reducers : {
        setNextPage : (state) => {
            state.currentPage = state.currentPage + 1;
        },
        setPrevPage : (state) => {
            state.currentPage = state.currentPage - 1;
        },
        setMovieQty : (state, action) => {
            state.movies = (action.payload);
        },
        setSerieQty : (state, action) => {
            state.series = (action.payload);
        },
        setCrewsQty : (state, action) => {
            state.crews = (action.payload);
        }
    }
});

export const { setMovieQty, setSerieQty, setCrewsQty, setNextPage, setPrevPage } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;