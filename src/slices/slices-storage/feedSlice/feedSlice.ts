import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../../utils/burger-api';

export type TFeedInitialState = {
  isLoading: boolean;
  orders: TOrder[];
  totalOrders: number;
  userOrders: TOrder[] | null;
  currentDayOrders: number;
  error: string;
};

export const initialState: TFeedInitialState = {
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
    selectFeedOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.currentDayOrders = action.payload.totalToday;
      });
  }
});

export const fetchFeed = createAsyncThunk('user/feed', async () => {
  const res = await getFeedsApi();
  return res;
});

export const {
  selectTotalOrders,
  selectCurrentDayOrders,
  selectFeedLoading,
  selectFeedOrders
} = feedSlice.selectors;

export const { removeOrders, removeUserOrders } = feedSlice.actions;

export default feedSlice.reducer;
