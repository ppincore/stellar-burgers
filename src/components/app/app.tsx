import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import '../../index.css';
import styles from './app.module.css';
import { useSelector, useDispatch } from '../../services/store';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import {
  fetchFeed,
  fetchIngredients,
  getUserThunk,
  init,
  selectIsModalOpened,
  selectIngredients,
  selectIsAuthenticated,
  selectOrders,
  closeModal
} from '../../slices/burgerSlice';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const feed = useSelector(selectOrders);
  const ingredients = useSelector(selectIngredients);
  const isAuth = useSelector(selectIsAuthenticated);
  const accessToken = getCookie('token');
  const isModalOpened = useSelector(selectIsModalOpened);
  const navigate = useNavigate();
  const handleModalClose = () => {
    dispatch(closeModal());
    navigate(-1);
  };
  useEffect(() => {
    if (!feed.length) {
      dispatch(fetchFeed());
    }
  }, []);
  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute unAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute unAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute unAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute unAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal
                children={<OrderInfo />}
                title={'Заказ'}
                onClose={handleModalClose}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal
              children={<OrderInfo />}
              title={'Заказ'}
              onClose={() => {
                dispatch(closeModal());
              }}
            />
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <ProtectedRoute>
              <Modal
                children={<IngredientDetails />}
                title={'Описание ингредиента'}
                onClose={() => {
                  dispatch(closeModal());
                }}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
