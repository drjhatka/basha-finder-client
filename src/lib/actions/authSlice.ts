import {createSlice} from "@reduxjs/toolkit";

export interface IAuthState {
    email: string;
    role: string;
    accessToken: string;
    iat: string;
    exp: string;
}
const initialState:IAuthState|null = null;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        removeUser: () => {
            // Remove the accessToken cookie
            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            // set auth state to null
            return null;
        }
    }
})
export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;