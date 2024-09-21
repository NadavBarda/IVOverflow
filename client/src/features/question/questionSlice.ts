import { createSlice } from "@reduxjs/toolkit";
import { IQuestion } from "../../interface/questionInterface";

const initialState: IQuestion[] = [];

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setQuestion } = questionSlice.actions;
export default questionSlice.reducer;
