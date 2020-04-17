import { configureStore, createSlice } from '@reduxjs/toolkit';
import example from '../example';
export const userSlice = createSlice({
    name: 'editMode',
    initialState: {
        value: false,
        config: example.config
    },
    reducers: {
        toggle: (state) => {
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
