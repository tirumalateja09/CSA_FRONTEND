
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchedDataById = createAsyncThunk( 'apiDataById/fetchData', async (productId) => {
    const response = await axios.get(`https://dummyjson.com/products/${productId}`);
    return response.data;
  }
);

const apiDataByIdSlice = createSlice({
  name: 'apiDataById',
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchedDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchedDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchedDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiDataByIdSlice.reducer;