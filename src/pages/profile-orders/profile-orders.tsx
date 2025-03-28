import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchUserOrders,
  selectLoading,
  selectUserOrders
} from '../../slices/burgerSlice';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders)!;
  console.log(orders);
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return orders! ? <Preloader /> : <ProfileOrdersUI orders={orders} />;
};
