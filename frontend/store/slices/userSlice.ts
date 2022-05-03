import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
    isLogin: boolean,
}

const initialState : userState = {
    isLogin: false,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setIsLogin(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload;
        }
    }
})

export const { setIsLogin } = userSlice.actions;

export default userSlice;