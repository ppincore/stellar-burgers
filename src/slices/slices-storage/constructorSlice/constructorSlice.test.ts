import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import { TIngredient } from '@utils-types';
import {
  moveIngredientDown,
  moveIngredientUp,
  deleteIngredient,
  addIngredient,
  resetConsructor,
  TConstructorInitialState
} from './constructorSlice';
import constructorSlice from './constructorSlice';

describe('[constructorSlice], тестирование слайса', () => {
  const mockIngritientRING: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0946',
    id: '0',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const mockIngritientCHEESE: TIngredient = {
    _id: '643d69a5c3f7b9001cfa094a',
    id: '1',
    name: 'Сыр с астероидной плесенью',
    type: 'main',
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const mockInitialState: TConstructorInitialState = {
    constructorItems: {
      bun: {
        price: 0
      },
      ingredients: []
    }
  };

  test('Тестирование добавления ингридиента', () => {
    const action = addIngredient(mockIngritientRING);
    const state = constructorSlice(mockInitialState, action);
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual(mockIngritientRING);
    expect(state.constructorItems.ingredients[0]).toHaveProperty('_id');
  });
  test('Тестирование перемещения ингридиента вверх', () => {
    const ingredientFirst = addIngredient(mockIngritientCHEESE);
    const ingredientSecond = addIngredient(mockIngritientRING);
    const initialState: TConstructorInitialState = {
      constructorItems: {
        bun: {
          price: 0
        },
        ingredients: [ingredientFirst.payload, ingredientSecond.payload]
      }
    };
    const state = constructorSlice(
      initialState,
      moveIngredientUp(ingredientSecond.payload)
    );
    expect(state.constructorItems.ingredients[0]).toBe(
      ingredientSecond.payload
    );
  });
  test('Тестирование перемещение игредиента вниз', () => {
    const ingredientFirst = addIngredient(mockIngritientCHEESE);
    const ingredientSecond = addIngredient(mockIngritientRING);
    const initialState: TConstructorInitialState = {
      constructorItems: {
        bun: {
          price: 0
        },
        ingredients: [ingredientSecond.payload, ingredientFirst.payload]
      }
    };
    const state = constructorSlice(
      initialState,
      moveIngredientDown(ingredientSecond.payload)
    );
    expect(state.constructorItems.ingredients[1]).toBe(
      ingredientSecond.payload
    );
  });
  test('Тестирование удаления ингридиента', () => {
    const action = addIngredient(mockIngritientRING);
    const initialState: TConstructorInitialState = {
      constructorItems: {
        bun: {
          price: 0
        },
        ingredients: [mockIngritientRING]
      }
    };
    const state = constructorSlice(
      initialState,
      deleteIngredient(action.payload)
    );
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });
  test('Тестирование очистки конструктора', () => {
    const initialState: TConstructorInitialState = {
      constructorItems: {
        bun: {
          price: 1337
        },
        ingredients: [
          mockIngritientRING,
          mockIngritientCHEESE,
          mockIngritientRING
        ]
      }
    };
    const state = constructorSlice(initialState, resetConsructor());
    expect(state.constructorItems).toEqual(mockInitialState.constructorItems);
  });
});
