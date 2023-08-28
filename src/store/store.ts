import { configureStore } from "@reduxjs/toolkit";
import zonesAndTransformersSlice from "./slices/zones-and-transformers-slice";

export const store = configureStore({
  reducer: { zonesAndTransformers: zonesAndTransformersSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
