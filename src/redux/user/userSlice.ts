import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import { deleteUser, getUsers, User } from "../../data/data";
import { RootState } from "../store";

export const fetchUsers = createAsyncThunk<User[]>(
  "user/fetchUsers",
  async () => getUsers(),
);

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (initialUser: number) => {
    try {
      const response = await deleteUser(initialUser);
      return response;
    } catch (err) {
      return isRejectedWithValue(err);
    }
  },
);

export interface UserState {
  userList: User[];
  loadingUsers: boolean;
  expandedUserList: number[];
}

const initialState = {
  userList: [],
  loadingUsers: true,
  expandedUserList: [],
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleUserList: (state, action) => {
      if (!state.expandedUserList.includes(action.payload)) {
        state.expandedUserList.push(action.payload);
      } else {
        state.expandedUserList = state.expandedUserList.filter(
          (user) => user !== action.payload,
        );
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      if (state.userList.length > 0) {
        return;
      }
      state.loadingUsers = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      if (state.userList.length > 0) {
        return;
      }
      state.userList.push(...payload);
      state.loadingUsers = false;
    });
    builder.addCase(removeUser.fulfilled, (state, payload) => {
      state.userList = state.userList.filter(
        (user) => user.id !== payload.meta.arg,
      );
    });
  },
});

export const { toggleUserList } = userSlice.actions;

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.user.userList;
export const loadingUsers = (state: RootState) => state.user.loadingUsers;
export const expandedUserList = (state: RootState) =>
  state.user.expandedUserList;
