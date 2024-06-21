import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("user")),
  outhchange: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.users = payload;
    },
    logout: (state) => {
      state.users = null;
    },
    outhchange: (state) => {
      state.outhchange = true;
    },
  },
});

export const { login, logout, outhchange } = userSlice.actions;
export default userSlice.reducer;
