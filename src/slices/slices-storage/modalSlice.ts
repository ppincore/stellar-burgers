import { createSlice } from '@reduxjs/toolkit';

export type TModalInitialState = {
  isModalOpened: boolean;
};

const initialState: TModalInitialState = {
  isModalOpened: false
};

const modalSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpened = true;
    },
    closeModal(state) {
      state.isModalOpened = false;
    }
  },
  selectors: {
    selectIsModalOpened: (state) => state.isModalOpened
  },
  extraReducers: (builder) => {}
});

export const { selectIsModalOpened } = modalSlice.selectors;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
