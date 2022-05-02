import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
    isLogin: boolean,
}

const initialState : CommonState = {
    isLogin: false,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLogin(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload;
        }
    }
})

export const { setIsLogin } = userSlice.actions;

export default userSlice;