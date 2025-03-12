import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./actions/authSlice"; // Import your auth slice

const rootReducer = combineReducers({
    auth: authReducer, // Add auth slice to the root reducer
});

export default rootReducer;