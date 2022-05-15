import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  isLogin: boolean;
  nickname: string;
  picPath: string;
  type: string;
}

interface IUserInfo {
  nickname: string;
  picPath: string;
  type: string;
}

const initialState: userState = {
  isLogin: false,
  nickname: "",
  picPath: "",
  type: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setIsLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },

    setUserInfo(state, action: PayloadAction<IUserInfo>) {
      state.nickname = action.payload.nickname;
      state.picPath = action.payload.picPath;
      state.type = action.payload.type;
    },
  },
});

export const { setIsLogin, setUserInfo } = userSlice.actions;

export default userSlice;
