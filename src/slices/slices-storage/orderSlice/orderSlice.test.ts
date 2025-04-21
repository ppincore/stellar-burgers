import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import {
  clearOrderModalData,
  fetchOrderByNumber,
  fetchUserOrders,
  fetchNewOrder,
  initialState,
  TOrderInitialState
} from './orderSlice';
import orderSlice from './orderSlice';
import { TOrder } from '@utils-types';

describe('[ingredientSlice], тестирование слайса', () => {
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
      const state = orderSlice(initialState, fetchOrderByNumber.pending('',1))
    });
    test('Тестирование rejected для запроса fetchOrderByNumber', () => {});
    test('Тестирование fulfilled для запроса fetchOrderByNumber', () => {});
  });
  describe('[fetchUserOrders], тестирование запроса', () => {
    test('Тестирование pending для запроса fetchUserOrders', () => {});
    test('Тестирование rejected для запроса fetchUserOrders', () => {});
    test('Тестирование fulfilled для запроса fetchUserOrders', () => {});
  });
  describe('[fetchNewOrder], тестирование запроса', () => {
    test('Тестирование pending для запроса fetchNewOrder', () => {});
    test('Тестирование rejected для запроса fetchNewOrder', () => {});
    test('Тестирование fulfilled для запроса fetchNewOrder', () => {});
  });
  test('Тестирование очистки данных для модального окна', () => {
    const mockInitialState: TOrderInitialState = {
      isLoading: false,
      orderRequest: false,
      userOrders: [],
      orderModalData: mockOrder,
      error: ''
    };
    const action = clearOrderModalData();
    const state = orderSlice(mockInitialState, action);
    expect(state.orderModalData).toBe(null);
  });
});
