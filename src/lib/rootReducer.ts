import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./actions/authSlice"; // Import your auth slice
import { userApi } from "./api/userApi";

const rootReducer = combineReducers({
    auth: authReducer, // Add auth slice to the root reducer
    [userApi.reducerPath]: userApi.reducer,
});

export default rootReducer;