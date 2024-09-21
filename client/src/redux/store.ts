import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import questionReducer from "../features/question/questionSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    questions: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
