import { createSlice } from '@reduxjs/toolkit';

export const searchActiveSlice = createSlice({
    name : 'searchActve',
    initialState : {
        current : "movies"
    },
    reducers : {
        setSearchActive : (state, action) => {
            state.current = action.payload;
        }
    }
});

export const { setSearchActive } = searchActiveSlice.actions;
export default searchActiveSlice.reducer;