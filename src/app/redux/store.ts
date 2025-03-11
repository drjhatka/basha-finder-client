"use client"
import { configureStore } from '@reduxjs/toolkit';
import {listingApi} from "@/app/redux/api/listingApi";
import {setupListeners} from "@reduxjs/toolkit/query";

// Create the Redux store
export const store = configureStore({
    reducer: {
                [listingApi.reducerPath]: listingApi.reducer,
            },
    middleware:(getDefaultMiddleware:any)=>getDefaultMiddleware().concat(listingApi.middleware),

});

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch