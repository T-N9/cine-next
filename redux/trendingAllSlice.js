import { createSlice } from '@reduxjs/toolkit';

export const trendingAllSlice = createSlice({
    name : 'trending_all',
    initialState : {
        trendingAllData : null
    },
    reducers : {
        setTrendingAll : (state, action) => {
            state.trendingAllData = action.payload;
        }
    }
});

export const { setTrendingAll } = trendingAllSlice.actions;
export default trendingAllSlice.reducer;