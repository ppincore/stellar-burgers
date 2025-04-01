import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi } from '@api';

export type TOrderInitialState = {
  isLoading: boolean;
  orderRequest: boolean;
  userOrders: TOrder[] | null;
  orders: TOrder[];
  orderModalData: TOrder | null;
  error: string;
};

const initialState: TOrderInitialState = {
  isLoading: false,
  orderRequest: false,
  userOrders: [],
  orders: [],
  orderModalData: null,
  error: ''
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    removeOrders(state) {
      state.orders.length = 0;
    },
    removeUserOrders(state) {
      state.userOrders = null;
    },
    closeOrderRequest(state) {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrders: (state) => state.orders,
    selectUserOrders: (state) => state.userOrders,
    selectOrderLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {}
});

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchUserOrders = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);

export const {
  selectOrderModalData,
  selectOrderRequest,
  selectOrders,
  selectUserOrders,
  selectOrderLoading
} = orderSlice.selectors;

export const { removeOrders, removeUserOrders, closeOrderRequest } =
  orderSlice.actions;

export default orderSlice.reducer;
