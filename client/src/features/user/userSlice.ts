import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interface/userInterface";


const initialState = { _id: "", username: "" } as IUser;
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
    },
    clearUser: (state) => {
      state._id = "";
      state.username = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
