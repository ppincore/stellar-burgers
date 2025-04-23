import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/slices-storage/userSlice/userSlice';
import orderSlice from '../slices/slices-storage/orderSlice/orderSlice';
import ingredientsSlice from '../slices/slices-storage/ingredientsSlice/ingredientsSlice';
import feedSlice from '../slices/slices-storage/feedSlice/feedSlice';
import constructorSlice from '../slices/slices-storage/constructorSlice/constructorSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
console.log(constructorSlice);
const rootReducer = combineReducers({
  constructorSlice: constructorSlice,
  feedSlice: feedSlice,
  ingredientsSlice: ingredientsSlice,
  orderSlice: orderSlice,
  userSlice: userSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
