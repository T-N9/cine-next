import { createSlice } from "@reduxjs/toolkit";

export const navActiveSlice = createSlice({
    name : 'navActivate',
    initialState : {
        current : "home",
        logo_sm : false,
        nav_sm : false
    },
    reducers : {
        activeNavItem : (state, action) => {
            state.current = action.payload;
        },
        makeLogoBig : (state) => {
            state.logo_sm = false;
        },
        makeLogoSmall : (state) => {
            state.logo_sm = true;
        },
        toggleNavSM : (state) => {
            state.nav_sm = !state.nav_sm;
        }
    },
});

export const { activeNavItem, makeLogoBig, makeLogoSmall, toggleNavSM } = navActiveSlice.actions;
export default navActiveSlice.reducer;