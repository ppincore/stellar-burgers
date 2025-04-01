import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

export type TFeedInitialState = {
  isLoading: boolean;
  orders: TOrder[];
  totalOrders: number;
  currentDayOrders: number;
  error: string;
};

const initialState: TFeedInitialState = {
  isLoading: false,
  orders: [],
  totalOrders: 0,
  currentDayOrders: 0,
  error: ''
};

const feedSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  selectors: {
    selectTotalOrders: (state) => state.totalOrders,
    selectCurrentDayOrders: (state) => state.currentDayOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.currentDayOrders = action.payload.totalToday;
      });
  }
});

export const fetchFeed = createAsyncThunk('user/feed', async () =>
  getFeedsApi()
);

export default feedSlice.reducer;
