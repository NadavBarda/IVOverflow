import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import questionReducer from "../features/question/questionSlice";
import answerReducer from "../features/answer/answerSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    questions: questionReducer,
    answers: answerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
