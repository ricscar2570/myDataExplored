import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Azione asincrona per recuperare i dati dal backend
export const fetchData = createAsyncThunk("data/fetchData", async (filter) => {
  const response = await axios.get("http://localhost:5000/api/query", { params: { filter } });
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
