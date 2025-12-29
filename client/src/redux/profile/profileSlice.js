import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch profiles with optional filters
export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async (
    { search = "", branch = "", passoutYear = "", category = "" } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = {};
      if (search) params.search = search;
      if (branch && branch !== "All Branches") params.branch = branch;
      if (passoutYear && passoutYear !== "All Years") params.passoutYear = passoutYear;
      if (category && category !== "All Categories") params.category = category;

      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/profiles", {
        params,
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Corrected here
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch profiles");
    }
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;

        // ✅ Normalize error so it's always a string
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else if (action.payload?.message) {
          state.error = action.payload.message;
        } else {
          state.error = "Failed to fetch profiles";
        }
      });
  },
});

export default profileSlice.reducer;
