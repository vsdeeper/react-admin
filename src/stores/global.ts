import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  userInfo: Record<string, any>;
}

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    userInfo: {},
  } as GlobalState,
  reducers: {
    storeUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

export const { storeUserInfo } = globalSlice.actions;
export default globalSlice.reducer;
