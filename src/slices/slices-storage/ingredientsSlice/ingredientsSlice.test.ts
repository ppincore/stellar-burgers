import {  describe, expect, test } from '@jest/globals';
import { fetchIngredients, initialState } from './ingredientsSlice';
import ingredientSlice from './ingredientsSlice';

import { TIngredient } from '@utils-types';

describe('[ingredientSlice], тестирование слайса', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: '',
      image_mobile: '',
      image_large: ''
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: '',
      image_mobile: '',
      image_large: ''
    }
  ];

  test('Тестирование pending запроса', () => {
    const state = ingredientSlice(initialState, fetchIngredients.pending(''));
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('Тестирование rejected запроса', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Error' }
    };
    const state = ingredientSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Error'
    });
  });
  test('Тестирование fullfield запроса', () => {
    const payload = {
      type: fetchIngredients.fulfilled.type,
      success: true,
      data: mockIngredients
    };
    const state = ingredientSlice(
      initialState,
      fetchIngredients.fulfilled(payload.data, '')
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: mockIngredients
    });
  });
});
