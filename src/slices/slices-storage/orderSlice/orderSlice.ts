import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '@api';

export type TOrderInitialState = {
  isLoading: boolean;
  orderRequest: boolean;
  userOrders: TOrder[];
  orderModalData: TOrder | null;
  error: string;
};

const initialState: TOrderInitialState = {
  isLoading: false,
  orderRequest: false,
  userOrders: [],
  orderModalData: null,
  error: ''
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    clearOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderLoading: (state) => state.isLoading,
    selectUserOrders: (state) => state.userOrders
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
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const fetchOrderByNumber = createAsyncThunk(
  'order/number',
  async (number: number) => {
    const result = await getOrderByNumberApi(number);
    return result.orders[0];
  }
);

export const fetchUserOrders = createAsyncThunk('user/orders', async () => {
  const res = await getOrdersApi();
  return res;
});

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);

export const {
  selectOrderModalData,
  selectOrderRequest,
  selectOrderLoading,
  selectUserOrders
} = orderSlice.selectors;

export const { clearOrderModalData } = orderSlice.actions;

export default orderSlice.reducer;
