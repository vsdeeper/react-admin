import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  userInfo: Record<string, any>;
  menu: VsMenuDataItem[];
}

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    userInfo: {},
    menu: [],
  } as GlobalState,
  reducers: {
    storeUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    storeMenu: (state, { payload }) => {
      state.menu = payload;
    },
  },
});

export const { storeUserInfo, storeMenu } = globalSlice.actions;
export default globalSlice.reducer;
