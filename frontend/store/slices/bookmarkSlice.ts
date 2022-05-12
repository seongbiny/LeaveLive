import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface bookmarkState {
    isBookmark: number[],
}

const initialState : bookmarkState = {
    isBookmark: [],
}

const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState,
    reducers: {
        setIsbookmark(state, action: PayloadAction<number[]>) {
            state.isBookmark = action.payload;
        }
    }
})

export const { setIsbookmark } = bookmarkSlice.actions;
export default bookmarkSlice;