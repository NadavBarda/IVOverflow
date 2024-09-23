import { createSlice } from "@reduxjs/toolkit";
import { IAnswer } from "../../interface/questionInterface";

const initialState: IAnswer[] = [];

export const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    setAnswers: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setAnswers } = answerSlice.actions;
export default answerSlice.reducer;
