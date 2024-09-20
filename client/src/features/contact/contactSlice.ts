import { createSlice } from "@reduxjs/toolkit";
import { ContactState } from "../../interface/ContactState";



const initialState: ContactState[] = [];

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setContacts } = contactSlice.actions;
export default contactSlice.reducer;
