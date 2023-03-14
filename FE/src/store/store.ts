import { loginSlice } from './loginSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loginReducer: loginSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
