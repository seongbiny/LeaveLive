import { combineReducers } from "redux";
import userSlice from "./userSlice";
import { HYDRATE } from "next-redux-wrapper";

export const rootReducer = (state: any, action: any) => {
    if(action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload
        }
    }
    return combineReducers({
        user: userSlice.reducer,
    })(state, action);
}

