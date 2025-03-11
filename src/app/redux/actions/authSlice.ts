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
            return null;
        }
    }
})
export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;