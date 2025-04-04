import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUserInfo } from '../../slices/exports';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectUserInfo);
  return <AppHeaderUI userName={user.name} />;
};
