import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import {
  clearOrderModalData,
  fetchOrderByNumber,
  fetchUserOrders,
  fetchNewOrder,
  orderSliceInitialState,
  TOrderInitialState
} from './orderSlice';
import orderSlice from './orderSlice';
import { TOrder } from '@utils-types';

describe('[orderSlice], тестирование слайса', () => {
  const mockOrder: TOrder = {
    _id: '68062e55e8e61d001cec3b9d',
    ingredients: ['1', '2', '3'],
    status: 'done',
    name: 'Краторный люминесцентный бургер',
    createdAt: '2025-04-21T11:39:01.788Z',
    updatedAt: '2025-04-21T11:39:03.235Z',
    number: 1
  };

  describe('[fetchOrderByNumber], тестирование запроса', () => {
    test('Тестирование pending для запроса fetchOrderByNumber', () => {
      const state = orderSlice(
        orderSliceInitialState,
        fetchOrderByNumber.pending('', 1)
      );
      expect(state).toEqual({
        ...orderSliceInitialState,
        isLoading: true
      });
    });
    test('Тестирование rejected для запроса fetchOrderByNumber', () => {
      const action = {
        type: fetchOrderByNumber.rejected.type,
        error: { message: 'Error' }
      };
      const state = orderSlice(orderSliceInitialState, action);
      expect(state).toEqual({
        ...orderSliceInitialState,
        isLoading: false,
        error: 'Error'
      });
    });
    test('Тестирование fulfilled для запроса fetchOrderByNumber', () => {
      const payload = {
        type: fetchOrderByNumber.fulfilled.type,
        success: true,
        order: mockOrder
      };
      const state = orderSlice(
        orderSliceInitialState,
        fetchOrderByNumber.fulfilled(payload.order, '', 1)
      );
      expect(state).toEqual({
        ...orderSliceInitialState,
        isLoading: false,
        orderRequest: false,
        orderModalData: payload.order
      });
    });
  });
  describe('[fetchUserOrders], тестирование запроса', () => {
    test('Тестирование pending для запроса fetchUserOrders', () => {
      const state = orderSlice(
        orderSliceInitialState,
        fetchUserOrders.pending('')
      );
      expect(state).toEqual({
        ...orderSliceInitialState,
        isLoading: true
      });
    });
    test('Тестирование rejected для запроса fetchUserOrders', () => {
      const action = {
        type: fetchUserOrders.rejected.type,
        error: { message: 'Error' }
      };
      const state = orderSlice(orderSliceInitialState, action);
      expect(state).toEqual({
        ...orderSliceInitialState,
        isLoading: false,
        error: 'Error'
      });
    });
    test('Тестирование fulfilled для запроса fetchUserOrders', () => {
      const payload = {
        type: fetchUserOrders.fulfilled.type,
        success: true,
        orders: [mockOrder]
      };
      const state = orderSlice(
        orderSliceInitialState,
        fetchUserOrders.fulfilled(payload.orders, '')
      );
      expect(state).toEqual({
        ...orderSliceInitialState,
        isLoading: false,
        userOrders: [mockOrder]
      });
    });
  });
  describe('[fetchNewOrder], тестирование запроса', () => {
    test('Тестирование pending для запроса fetchNewOrder', () => {
      const state = orderSlice(
        orderSliceInitialState,
        fetchNewOrder.pending('', [])
      );
      expect(state).toEqual({
        ...orderSliceInitialState,
        isLoading: true,
        orderRequest: true
      });
    });
    test('Тестирование rejected для запроса fetchNewOrder', () => {
      const action = {
        type: fetchNewOrder.rejected.type,
        error: { message: 'Error' }
      };
      const state = orderSlice(orderSliceInitialState, action);
      expect(state).toEqual({
        ...orderSliceInitialState,
        isLoading: false,
        error: 'Error'
      });
    });
    test('Тестирование fulfilled для запроса fetchNewOrder', () => {
      const payload = {
        success: true,
        name: 'Заказ принят',
        order: mockOrder
      };
      const state = orderSlice(
        orderSliceInitialState,
        fetchNewOrder.fulfilled(payload, '', [''])
      );
      expect(state).toEqual({
        ...orderSliceInitialState,
        isLoading: false,
        orderRequest: false,
        orderModalData: mockOrder
      });
    });
  });
  test('Тестирование очистки данных для модального окна', () => {
    const mockorderSliceInitialState: TOrderInitialState = {
      isLoading: false,
      orderRequest: false,
      userOrders: [],
      orderModalData: mockOrder,
      error: ''
    };
    const action = clearOrderModalData();
    const state = orderSlice(mockorderSliceInitialState, action);
    expect(state.orderModalData).toBe(null);
  });
});
