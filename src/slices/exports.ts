export {
  selectUserInfo,
  selectIsAuthenticated,
  selectIsInit,
  selectUserLoading,
  setErrorText,
  selectErrorText,
  initUser,
  removeErrorText,
  fetchLoginUser,
  fetchRegisterUser,
  fetchUser,
  fetchUpdateUser,
  fetchLogout
} from './slices-storage/userSlice';

export {
  selectOrderModalData,
  selectOrderRequest,
  selectOrderLoading,
  clearOrderModalData,
  selectUserOrders,
  fetchUserOrders,
  fetchOrderByNumber,
  fetchNewOrder
} from './slices-storage/orderSlice';

export {
  selectIsModalOpened,
  openModal,
  closeModal
} from './slices-storage/modalSlice';

export {
  selectIngredients,
  selectIngredientsLoading,
  fetchIngredients
} from './slices-storage/ingredientsSlice';
export {
  selectTotalOrders,
  selectCurrentDayOrders,
  selectFeedLoading,
  selectFeedOrders,
  removeOrders,
  removeUserOrders,
  fetchFeed
} from './slices-storage/feedSlice';

export {
  selectConstructorItems,
  moveIngredientDown,
  moveIngredientUp,
  addIngredient,
  deleteIngredient
} from './slices-storage/constructorSlice';
