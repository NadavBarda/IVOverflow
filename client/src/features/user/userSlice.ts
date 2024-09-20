import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interface/userInterface";


const initialState = { id: "", username: "" } as IUser;
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    clearUser: (state) => {
      state.id = "";
      state.username = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
