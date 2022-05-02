import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { rootReducer } from "./slices";

const logger = createLogger();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: (defaultEnhancers) => [...defaultEnhancers]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch