import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectFeedOrders, fetchFeed } from '../../slices/exports';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeedOrders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeed());
    }
  }, []);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  return !orders.length ? (
    <Preloader />
  ) : (
    <FeedUI orders={orders} handleGetFeeds={() => handleGetFeeds()} />
  );
};
