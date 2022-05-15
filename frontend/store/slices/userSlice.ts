import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
    isLogin: boolean;
    type: string;
}

const initialState : userState = {
    isLogin: false,
    type: "",
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setIsLogin(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload;
        },

        setType(state, action: PayloadAction<string>) {
            state.type = action.payload;
        }
    }
})

export const { setIsLogin, setType } = userSlice.actions;

export default userSlice;