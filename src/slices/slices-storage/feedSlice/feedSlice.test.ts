import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import {
  removeOrders,
  removeUserOrders,
  TFeedInitialState,
  fetchFeed,
  initialState
} from './feedSlice';
import feedSlice from './feedSlice';
import { TOrder } from '@utils-types';

describe('[feedSlice], тестирование слайса', () => {
  const orders: TOrder[] = [
    {
      _id: '68062e55e8e61d001cec3b9d',
      ingredients: ['1', '2', '3'],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2025-04-21T11:39:01.788Z',
      updatedAt: '2025-04-21T11:39:03.235Z',
      number: 1
    },
    {
      _id: '68062da8e8e61d001cec3b98',
      ingredients: ['1', '2', '3'],
      status: 'done',
      name: 'Space бургер',
      createdAt: '2025-04-21T11:36:08.584Z',
      updatedAt: '2025-04-21T11:36:09.349Z',
      number: 2
    }
  ];
  const mockInitialState: TFeedInitialState = {
    isLoading: false,
    orders: orders,
    userOrders: [],
    totalOrders: 0,
    currentDayOrders: 0,
    error: ''
  };


  test('Тестирование очистки заказов', () => {
    const action = removeOrders();
    const state = feedSlice(mockInitialState, action);
    expect(state.orders).toHaveLength(0);
  });
  test('Тестирование очистки заказов пользователя', () => {
    const action = removeUserOrders();
    const state = feedSlice(mockInitialState, action);
    expect(state.userOrders).toBe(null);
  });
  test('Тестирование reject запроса', () => {
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: 'Error' }
    };
    const state = feedSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Error'
    });
  });
  test('Тестирование pending запроса', () => {
    const state = feedSlice(initialState, fetchFeed.pending(''));
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('Тестирование fullfield запроса', () => {
    const payload = {
      type: fetchFeed.fulfilled.type,
      success: true,
      orders: orders,
      total: 10,
      totalToday: 5
    };
    const state = feedSlice(initialState, fetchFeed.fulfilled(payload, ''));
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: orders,
      totalOrders: 10,
      currentDayOrders: 5
    });
  });
});
