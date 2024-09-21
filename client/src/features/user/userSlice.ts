import { createSlice } from "@reduxjs/toolkit";
import { ILoginUser } from "../../interface/userInterface";

const initialState = {
  user: { id: "", username: "" },
  token: "",
} as ILoginUser;
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = { id: "", username: "" };
      state.token = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
