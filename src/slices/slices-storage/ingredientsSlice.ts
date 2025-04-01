import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
export type TIngredientInitialState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string;
};

const initialState: TIngredientInitialState = {
  ingredients: [],
  isLoading: false,
  error: ''
};

const ingredientsSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const { selectIngredients } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
