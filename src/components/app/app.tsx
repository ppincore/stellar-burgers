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
import ProtectedRoute from '../routes/protected-route';
import '../../index.css';
import styles from './app.module.css';
import { useSelector, useDispatch } from '../../services/store';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import {
  fetchIngredients,
  fetchUser,
  selectIngredients,
  closeModal,
  selectOrderModalData,
  clearOrderModalData
} from '../../slices/exports';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);
  const navigate = useNavigate();
  const orderNumber = useSelector(selectOrderModalData)?.number;
  const orderNum = () => {
    if (orderNumber) {
      return '#' + orderNumber;
    } else return ' ';
  };
  const backgroundPage = location.state?.background;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleModalClose = () => {
    dispatch(clearOrderModalData());
    dispatch(closeModal());
    navigate(-1);
  };

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundPage || location}>
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
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
      </Routes>
      {backgroundPage && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  children={<OrderInfo />}
                  title={orderNum()}
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
                title={orderNum()}
                onClose={handleModalClose}
              />
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                children={<IngredientDetails />}
                title={'Детали ингредиента'}
                onClose={handleModalClose}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
