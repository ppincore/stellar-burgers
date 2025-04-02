import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  fetchFeed,
  fetchUserOrders,
  selectUserOrders
} from '../../slices/exports';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
    dispatch(fetchUserOrders());
  }, []);

  const userOrders = useSelector(selectUserOrders);

  if (!userOrders) {
    return <Preloader />;
  }
  return (
    <>
      <ProfileOrdersUI orders={userOrders} />
    </>
  );
};
