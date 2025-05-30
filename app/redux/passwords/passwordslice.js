import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
    loading: false,
    error: null,
};

const passwordsSlice = createSlice({
    name: 'passwords',
    initialState,
    reducers: {
        addPassword: (state, action) => {
            state.value.push(action.payload);
        },
        removePassword: (state, action) => {
            state.value = state.value.filter(
                (password) => password.passwordId !== action.payload
            );
        },
        setpasswords: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {
    addPassword,
    removePassword,
    setpasswords
} = passwordsSlice.actions;

export default passwordsSlice.reducer;