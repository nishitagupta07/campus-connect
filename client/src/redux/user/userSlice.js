import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: null,
  favorites: [],
  cart: [],
  loading: false,
  error: null,
};

// ✅ Sign In thunk
export const signIn = createAsyncThunk(
  "user/signIn",
  async (credentials, thunkAPI) => {
    try {
      // ✅ Fixed endpoint
      const res = await axios.post("/api/auth/signin", credentials);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Sign in failed"
      );
    }
  }
);

// ✅ Sign Up thunk
export const signUp = createAsyncThunk(
  "user/signUp",
  async (formData, thunkAPI) => {
    try {
      // ✅ Fixed endpoint
      const res = await axios.post("/api/auth/signup", formData);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Sign up failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    addToFavorites: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item !== action.payload
      );
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearUserData: (state) => {
      state.profile = null;
      state.favorites = [];
      state.cart = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  updateProfile,
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
