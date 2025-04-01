export {
  selectUserInfo,
  selectIsAuthenticated,
  selectIsInit,
  selectLoading,
  initUser,
  setErrorText,
  removeErrorText,
  fetchLoginUser,
  fetchRegisterUser,
  getUser,
  fetchUpdateUser,
  fetchLogout
} from './slices-storage/userSlice';

export {
  selectOrderModalData,
  selectOrderRequest,
  selectOrders,
  selectUserOrders,
  fetchUserOrders,
  fetchNewOrder,
  removeOrders,
  removeUserOrders,
  closeOrderRequest
} from './slices-storage/orderSlice';

export {
  selectIsModalOpened,
  openModal,
  closeModal
} from './slices-storage/modalSlice';

export {
  selectIngredients,
  fetchIngredients
} from './slices-storage/ingredientsSlice';
export { selectConstructorItems } from './slices-storage/constructorSlice';
