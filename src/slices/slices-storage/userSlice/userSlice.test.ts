import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import {
  fetchLogout,
  fetchUpdateUser,
  fetchUser,
  fetchRegisterUser,
  fetchLoginUser,
  initUser,
  setErrorText,
  removeErrorText,
  initialState
} from './userSlice';

import userSlice from './userSlice';
import { userInfo } from 'os';
import { TUser } from '@utils-types';

describe('[userSlice], тестирование слайса', () => {
  const mockUserData: TUser = {
    name: 'Admin',
    email: 'admin@example.com'
  };

  describe('[fetchLogout], тестирование запроса', () => {
    test('Тестирование pending для запроса fetchLogout', () => {
      const action = { type: fetchLogout.pending.type };
      const state = userSlice(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true });
    });
    test('Тестирование rejected для запроса fetchLogout', () => {
      const action = {
        type: fetchLogout.rejected.type,
        error: { message: 'Error' }
      };
      const state = userSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: 'Error'
      });
    });
    test('Тестирование fulfilled для запроса fetchLogout', () => {
      const action = { type: fetchLogout.fulfilled.type };
      const state = userSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        userInfo: { name: '', email: '' },
        isLoading: false,
        isAuth: false
      });
    });
  });
  describe('[fetchUpdateUser], тестирование запроса', () => {
    test('Тестирование pending для запроса fetchUpdateUser', () => {
      const action = { type: fetchUpdateUser.pending.type };
      const state = userSlice(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true });
    });
    test('Тестирование rejected для запроса fetchUpdateUser', () => {
      const action = {
        type: fetchUpdateUser.rejected.type,
        error: { message: 'Error' }
      };
      const state = userSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: 'Error'
      });
    });
    test('Тестирование fulfilled для запроса fetchUpdateUser', () => {
      const action = {
        type: fetchUpdateUser.fulfilled.type,
        payload: mockUserData
      };
      const state = userSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        userInfo: mockUserData,
        isLoading: false
      });
    });
  });
  describe('[fetchUser], тестирование запроса', () => {
    test('Тестирование pending для запроса fetchUser', () => {
      const action = { type: fetchUser.pending.type };
      const state = userSlice(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true });
    });
    test('Тестирование rejected для запроса fetchUser', () => {
      const action = {
        type: fetchUser.rejected.type,
        error: { message: 'Error' }
      };
      const state = userSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        userInfo: { name: '', email: '' },
        isAuth: false,
        error: 'Error'
      });
    });
    test('Тестирование fulfilled для запроса fetchUser', () => {
      const action = {
        type: fetchUser.fulfilled.type,
        payload: mockUserData
      };
      const state = userSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        userInfo: mockUserData,
        isLoading: false,
        isAuth: true
      });
    });
  });
  describe('[fetchRegisterUser], тестирование запроса', () => {
    test('Тестирование pending для запроса fetchRegisterUser', () => {
      const action = { type: fetchRegisterUser.pending.type };
      const state = userSlice(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true });
    });
    test('Тестирование rejected для запроса fetchRegisterUser', () => {
      const action = {
        type: fetchRegisterUser.rejected.type,
        error: { message: 'Error' }
      };
      const state = userSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: 'Error'
      });
    });
    test('Тестирование fulfilled для запроса fetchRegisterUser', () => {
      const action = {
        type: fetchRegisterUser.fulfilled.type,
        payload: mockUserData
      };
      const state = userSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        userInfo: mockUserData,
        isLoading: false,
        isAuth: true
      });
    });
  });
  describe('[fetchLoginUser], тестирование запроса', () => {
    test('Тестирование pending для запроса fetchLoginUser', () => {
      const action = { type: fetchLoginUser.pending.type };
      const state = userSlice(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true });
    });
    test('Тестирование rejected для запроса fetchLoginUser', () => {
      const action = {
        type: fetchLoginUser.rejected.type,
        error: { message: 'Error' }
      };
      const state = userSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isAuth: false,
        userInfo: { name: '', email: '' },
        error: 'Error'
      });
    });
    test('Тестирование fulfilled для запроса fetchLoginUser', () => {
      const action = {
        type: fetchLoginUser.fulfilled.type,
        payload: mockUserData
      };
      const state = userSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        userInfo: mockUserData,
        isLoading: false,
        isAuth: true
      });
    });
  });
  test('[initUser], тестирование запроса', () => {
    const state = userSlice(initialState, initUser());
    expect(state).toEqual({
      ...initialState,
      isInit: true
    });
  });
  test('[setErrorText], тестирование запроса', () => {
    const state = userSlice(initialState, setErrorText('Error'));
    expect(state).toEqual({
      ...initialState,
      error: 'Error'
    });
  });
  test('[removeErrorText], тестирование запроса', () => {
    const mockInitialState = {
      ...initialState,
      error: 'Error text'
    };
    const state = userSlice(mockInitialState, removeErrorText());
    expect(state).toEqual(initialState);
  });
});
