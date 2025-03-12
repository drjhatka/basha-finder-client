"use client"
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";
import {listingApi} from "@/lib/api/listingApi";
import rootReducer from "@/lib/rootReducer";

const authPersistConfig = {
    key: "auth",
    storage: storage,
};
const persistedReducer = persistReducer(authPersistConfig, rootReducer);
// Create the Redux store
export const store = configureStore({
    reducer: {
                [listingApi.reducerPath]: listingApi.reducer,
                rootReducers:persistedReducer,
            },
    middleware:(getDefaultMiddleware:any)=>getDefaultMiddleware(
        {serializableCheck:false},
    ).concat(listingApi.middleware),

});

export const persistor = persistStore(store);

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

