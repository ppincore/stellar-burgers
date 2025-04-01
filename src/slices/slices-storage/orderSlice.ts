import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

export type TOrderInitialState = {
  isLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string;
};

const initialState: TOrderInitialState = {
  isLoading: false,
  orderRequest: false,
  orderModalData: null,
  error: ''
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    closeOrderRequest(state) {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      });
  }
});

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const { selectOrderModalData, selectOrderRequest, selectOrderLoading } =
  orderSlice.selectors;

export const { closeOrderRequest } = orderSlice.actions;

export default orderSlice.reducer;
