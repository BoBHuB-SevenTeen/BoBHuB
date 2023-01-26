import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from '../api/API';
import { User } from '../type/userType';

export const getUsersData = createAsyncThunk(
  'admin/getUsersData',
  async (_, { rejectWithValue }) => {
    try {
      const res = await get('/api/admin/users');
      console.log(res);
      if (!res) {
        throw new Error('데이터를 받아오지 못했습니다.');
      }
      return res;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  },
);

const initialState: { users: User[] } = {
  users: [],
};

const adminUsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersData.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUsersData.rejected, (state, action) => {
      state.users = [];
    });
  },
});

export default adminUsersSlice;
