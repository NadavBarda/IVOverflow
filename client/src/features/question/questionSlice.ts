import { createSlice } from "@reduxjs/toolkit";
import { IQuestion } from "../../interface/questionInterface";

const initialState: IQuestion[] = [];

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setQuestions } = questionSlice.actions;
export default questionSlice.reducer;
