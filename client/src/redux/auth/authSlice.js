// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   currentUser: null,
//   loading: false,
//   error: null,
// };

// // Async thunk for sign in
// export const signIn = createAsyncThunk(
//   "auth/signIn",
//   async (credentials, thunkAPI) => {
//     try {
//       // ✅ Fixed endpoint
//       const response = await axios.post("/api/auth/signin", credentials);
//       return response.data.user; // adjust if backend returns differently
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Sign in failed"
//       );
//     }
//   }
// );

// // Async thunk for sign up
// export const signUp = createAsyncThunk(
//   "auth/signUp",
//   async (formData, thunkAPI) => {
//     try {
//       // ✅ Fixed endpoint
//       const response = await axios.post("/api/auth/signup", formData);
//       return response.data.user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Sign up failed"
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     signInStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     signInSuccess: (state, action) => {
//       state.loading = false;
//       state.currentUser = action.payload;
//     },
//     signInFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     signOut: (state) => {
//       state.currentUser = null;
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signIn.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signIn.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(signIn.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(signUp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signUp.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(signUp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { signInStart, signInSuccess, signInFailure, signOut } =
//   authSlice.actions;

// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for sign in
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/signin", credentials);
      // Backend returns { message, user, token } directly in response.data
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Sign in failed"
      );
    }
  }
);

// Async thunk for sign up
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/signup", formData);
      // Backend returns { message, user, token } directly in response.data
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Sign up failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Load user from localStorage on app start
    loadUser: (state) => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        state.token = token;
        state.currentUser = JSON.parse(userStr);
      }
    },
    signOut: (state) => {
      state.currentUser = null;
      state.token = null;
      state.error = null;
      state.loading = false;

      // Clear from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;

        // Store in localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;

        // Store in localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loadUser, signOut } = authSlice.actions;
export default authSlice.reducer;
