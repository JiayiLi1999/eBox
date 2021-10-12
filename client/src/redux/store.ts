import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducers/index";

export const store = createStore(rootReducer,applyMiddleware(
    thunkMiddleware, 
));
console.log("store",store.getState())

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch