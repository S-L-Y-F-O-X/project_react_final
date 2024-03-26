import {createSlice, isPending, isRejected, isFulfilled} from "@reduxjs/toolkit";

interface IState {
    isLoading: boolean
}

const initialState: IState = {
    isLoading: false
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled, state => {
                state.isLoading = false;
            })
            .addMatcher(isPending, state => {
                state.isLoading = true;
            })
            .addMatcher(isRejected, state => {
                state.isLoading = false;
            })
});

const {reducer: loadingReducer} = loadingSlice;

export {loadingReducer};