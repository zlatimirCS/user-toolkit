import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  BlogPost,
  deleteBlogPost,
  deleteUser,
  editBlogPost,
  getMembers,
  getUsers,
  User,
} from "../../data/data";
import { RootState } from "../store";

export const fetchUsers = createAsyncThunk<User[]>(
  "user/fetchUsers",
  async () => getUsers(),
);

export const fetchPosts = createAsyncThunk<BlogPost[]>(
  "user/fetchPosts",
  async () => getMembers(),
);

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (initialUser: number) => {
    try {
      const response = await deleteUser(initialUser);
      return response;
    } catch (err) {}
  },
);

export const removePost = createAsyncThunk(
  "user/removePost",
  async (initialPost: string) => {
    try {
      const response = await deleteBlogPost(initialPost);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  },
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async ({
    id,
    data,
  }: {
    id: string;
    data: { userId: number; datePosted: string; title: string; body: string };
  }) => {
    try {
      const response = await editBlogPost(id, data);
      return response;
    } catch (err) {}
  },
);

export interface UserState {
  userList: User[];
  allPosts: BlogPost[];
  loadingUsers: boolean;
  expandedUserList: number[];
}

const initialState = {
  userList: [],
  allPosts: [],
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
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      if (state.allPosts.length > 0) {
        return;
      }
      state.allPosts.push(...payload);
    });
    builder.addCase(removePost.fulfilled, (state, payload) => {
      state.allPosts = state.allPosts.filter(
        (post) => post.id !== payload.meta.arg,
      );
    });
    builder.addCase(editPost.fulfilled, (state, { payload }) => {
      let id: string;
      if (payload && payload.id && payload.datePosted) {
        id = payload.id;
        payload.datePosted = new Date().toISOString();
        const posts = state.allPosts.filter((post) => post.id !== id);
        state.allPosts = [...posts, payload];
      }
    });
  },
});

// TODO: Export any redux actions if needed
export const { toggleUserList } = userSlice.actions;

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.user.userList;
export const selectPosts = (state: RootState) => state.user.allPosts;
export const loadingUsers = (state: RootState) => state.user.loadingUsers;
export const expandedUserList = (state: RootState) =>
  state.user.expandedUserList;
function rejectWithValue(data: any): any {
  throw new Error("Function not implemented.");
}

