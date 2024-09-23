import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interface/userInterface";

const initialState: IUser = {
  _id: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  myQuestions: [],
  favoriteQuestions: [],
  likedAnswers: [],
  dislikedAnswers: [],
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
      return state;
    },
    clearUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
