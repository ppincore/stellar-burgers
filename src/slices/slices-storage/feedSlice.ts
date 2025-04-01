import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrdersApi } from '@api';

export type TFeedInitialState = {
  isLoading: boolean;
  orders: TOrder[];
  totalOrders: number;
  userOrders: TOrder[] | null;
  currentDayOrders: number;
  error: string;
};

const initialState: TFeedInitialState = {
  isLoading: false,
  orders: [],
  userOrders: [],
  totalOrders: 0,
  currentDayOrders: 0,
  error: ''
};

const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {
    removeOrders(state) {
      state.orders.length = 0;
    },
    removeUserOrders(state) {
      state.userOrders = null;
    }
  },
  selectors: {
    selectTotalOrders: (state) => state.totalOrders,
    selectCurrentDayOrders: (state) => state.currentDayOrders,
    selectFeedLoading: (state) => state.isLoading,
    selectFeedOrders: (state) => state.orders,
    selectUserOrders: (state) => state.userOrders
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
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
        console.log(state.userOrders);
      });
  }
});

export const fetchUserOrders = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);

export const fetchFeed = createAsyncThunk('user/feed', async () =>
  getFeedsApi()
);

export const {
  selectTotalOrders,
  selectCurrentDayOrders,
  selectFeedLoading,
  selectUserOrders,
  selectFeedOrders
} = feedSlice.selectors;

export const { removeOrders, removeUserOrders } = feedSlice.actions;

export default feedSlice.reducer;
