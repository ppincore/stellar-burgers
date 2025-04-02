import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  fetchFeed,
  fetchUserOrders,
  selectUserOrders,
  selectFeedLoading
} from '../../slices/exports';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  const userOrders = useSelector(selectUserOrders);
  const isLoading = useSelector(selectFeedLoading);
  if (isLoading || !userOrders) {
    return <Preloader />;
  }
  return (
    <>
      <ProfileOrdersUI orders={userOrders} />
    </>
  );
};
