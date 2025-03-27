import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUserInfo } from '../../slices/burgerSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectUserInfo);
  return <AppHeaderUI userName={user.name} />;
};
