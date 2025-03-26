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
import { Routes, Route, useLocation } from 'react-router-dom';
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
  selectIngredients,
  selectIsAuthenticated,
  selectOrders
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
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
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
                onClose={() => {}}
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
              onClose={() => {}}
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
                onClose={() => {}}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
