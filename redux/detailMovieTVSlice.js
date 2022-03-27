import { createSlice } from "@reduxjs/toolkit";

export const detailMovieTVSlice = createSlice({
    name : 'detail_movie_tv',
    initialState : {
        item_id : null,
        item_type : 'movie',
        movie_name : '',
        imdb_id : '',
        torrents : [],
        year_released : ''
    },
    reducers : {
        setItemId : (state, {payload}) => {
            state.item_id = payload;
        },
        setItemType : (state, {payload}) => {
            state.item_type = payload;
        },
        setMovieName : (state, {payload}) => {
            state.movie_name = payload;
        },
        setImdbId : (state, {payload}) => {
            state.imdb_id = payload;
        },
        setTorrents : (state, {payload}) => {
            state.torrents = payload;
        },
        setYearReleased : (state, {payload}) => {
            state.year_released = payload;
        }
    }
});

export const { setItemId, setItemType, setImdbId, setMovieName, setTorrents, setYearReleased } = detailMovieTVSlice.actions;
export default detailMovieTVSlice.reducer;