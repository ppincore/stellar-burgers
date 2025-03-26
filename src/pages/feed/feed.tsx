import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectOrders, fetchFeed } from '../../slices/burgerSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };
  return !orders.length ? (
    <Preloader />
  ) : (
    <FeedUI orders={orders} handleGetFeeds={() => handleGetFeeds()} />
  );
};
