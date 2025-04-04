import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorItems, TIngredient } from '@utils-types';

export type TConstructorInitialState = {
  constructorItems: TConstructorItems;
};

const initialState: TConstructorInitialState = {
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload
        });
      }
    },
    deleteIngredient(state, action: PayloadAction<TIngredient>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, index) => index !== ingredientIndex
        );
    },
    moveIngredientUp(state, action: PayloadAction<TIngredient>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const prevItem = state.constructorItems.ingredients[ingredientIndex - 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex - 1,
        2,
        action.payload,
        prevItem
      );
    },
    moveIngredientDown(state, action: PayloadAction<TIngredient>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const nextItem = state.constructorItems.ingredients[ingredientIndex + 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex,
        2,
        nextItem,
        action.payload
      );
    },
    resetConsructor(state) {
      state.constructorItems = {
        bun: {
          price: 0
        },
        ingredients: []
      };
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems
  },
  extraReducers: (builder) => {}
});

export const { selectConstructorItems } = constructorSlice.selectors;
export const {
  moveIngredientDown,
  moveIngredientUp,
  deleteIngredient,
  addIngredient,
  resetConsructor
} = constructorSlice.actions;
export default constructorSlice.reducer;