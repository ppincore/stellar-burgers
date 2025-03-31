import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  fetchUserOrders,
  removeUserOrders,
  selectUserOrders
} from '../../slices/burgerSlice';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(removeUserOrders());
    dispatch(fetchUserOrders());
  }, [dispatch]);
  if (!orders) {
    return <Preloader />;
  }
  return (
    <>
      <ProfileOrdersUI orders={orders} />
    </>
  );
};
