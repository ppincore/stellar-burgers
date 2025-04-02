import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  selectErrorText,
  fetchLoginUser,
  removeErrorText,
  selectUserLoading
} from '../../slices/exports';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorText = useSelector(selectErrorText);
  const isLoading = useSelector(selectUserLoading);
  useEffect(() => {
    dispatch(removeErrorText());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password }));
    dispatch(removeErrorText());
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
