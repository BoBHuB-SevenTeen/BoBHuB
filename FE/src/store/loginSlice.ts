import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state) => {
      state.isLogin = true;
    },
    logoutAction: (state) => {
      state.isLogin = false;
    },
  },
});

export const { loginAction, logoutAction } = loginSlice.actions;
