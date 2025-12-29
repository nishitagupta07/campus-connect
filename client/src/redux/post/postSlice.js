import { createSlice } from "@reduxjs/toolkit";
import API from "../../api/Axios"; // Axios now points to http://localhost:500/api

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = null;
    },
    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPosts: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    addOne: (state, action) => {
      state.loading = false;
      state.posts.unshift(action.payload);
    },
    patchLikes: (state, action) => {
      const idx = state.posts.findIndex((p) => p._id === action.payload._id);
      if (idx !== -1) state.posts[idx].likes = action.payload.likes;
    },
    replaceOne: (state, action) => {
      const idx = state.posts.findIndex((p) => p._id === action.payload._id);
      if (idx !== -1) state.posts[idx] = action.payload;
    },
  },
});

export const { start, fail, setPosts, addOne, patchLikes, replaceOne } = slice.actions;
export default slice.reducer;

// Thunks
export const fetchPosts = (params = {}) => async (dispatch) => {
  try {
    dispatch(start());
    const { data } = await API.get("/posts", { params });
    dispatch(setPosts(data));
  } catch (e) {
    dispatch(fail(e.response?.data?.message || "Failed to load posts"));
  }
};

export const createPost = (payload) => async (dispatch) => {
  try {
    dispatch(start());
    const { data } = await API.post("/posts", payload);
    dispatch(addOne(data));
  } catch (e) {
    dispatch(fail(e.response?.data?.message || "Failed to create post"));
  }
};

export const toggleLike = (id) => async (dispatch) => {
  try {
    const { data } = await API.post(`/posts/${id}/like`);
    dispatch(patchLikes(data));
  } catch (e) {
    console.error("Like failed", e);
  }
};

export const addComment = (id, text) => async (dispatch) => {
  try {
    dispatch(start());
    const { data } = await API.post(`/posts/${id}/comment`, { text });
    dispatch(replaceOne(data));
  } catch (e) {
    dispatch(fail(e.response?.data?.message || "Failed to comment"));
  }
};
