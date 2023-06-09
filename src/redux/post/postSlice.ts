import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import {
  BlogPost,
  deleteBlogPost,
  editBlogPost,
  getMembers,
  addBlogPost,
} from "../../data/data";
import { RootState } from "../store";

export const fetchPosts = createAsyncThunk<BlogPost[]>(
  "post/fetchPosts",
  async () => getMembers(),
);

export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async ({
    id,
    userId,
    datePosted,
    title,
    body,
  }: {
    id: string;
    userId: number;
    datePosted: string;
    title: string;
    body: string;
  }) => {
    try {
      const response = await addBlogPost({
        id,
        userId,
        datePosted,
        title,
        body,
      });
      return response;
    } catch (err: any) {
      throw isRejectedWithValue(err.message)
    }
  },
);

export const removePost = createAsyncThunk(
  "post/removePost",
  async (initialPost: string) => {
    try {
      const response = await deleteBlogPost(initialPost);
      return response;
    } catch (err: any) {}
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

export interface PostState {
  allPosts: BlogPost[];
  addingError: boolean;
}

const initialState = {
  allPosts: [],
  addingError: false,
} as PostState;

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      if (state.allPosts.length > 0) {
        return;
      }
      state.allPosts.push(...payload);
    });
    builder.addCase(addNewPost.rejected, (state) => {
      state.addingError = true;
    });
    builder.addCase(addNewPost.fulfilled, (state, { payload }) => {
      state.addingError = false;
      if (payload) {
        state.allPosts = [...state.allPosts, payload];
      }
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

export default postSlice.reducer;

export const selectPosts = (state: RootState) => state.post.allPosts;
export const addingError = (state: RootState) => state.post.addingError;
