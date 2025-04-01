import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/slices-storage/userSlice';
import orderSlice from '../slices/slices-storage/orderSlice';
import modalSlice from '../slices/slices-storage/modalSlice';
import ingredientsSlice from '../slices/slices-storage/ingredientsSlice';
import feedSlice from '../slices/slices-storage/feedSlice';
import constructorSlice from '../slices/slices-storage/constructorSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  constructorSlice: constructorSlice,
  feedSlice: feedSlice,
  ingredientsSlice: ingredientsSlice,
  modalSlice: modalSlice,
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
