import { configureStore, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import example from '../example';

export const userSlice = createSlice({
    name: 'editMode',
    initialState: {
        value: false,
        config: example.config
    },
    reducers: {
        toggle: (state) => {
            if (state.value === true) {
                // updating user cookies for site
                Cookies.set('user', JSON.stringify({ ...state.userConf, config: state.config }), {
                    expires: 999999,
                    path: ''
                });
            }
            state.value = !state.value;
        },
        update: (state, action) => {
            state.config = action.payload;
        }
    }
});

export const { toggle, update } = userSlice.actions;

export default configureStore({
    reducer: {
        userSlice: userSlice.reducer
    }
});
