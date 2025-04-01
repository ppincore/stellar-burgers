import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  selectErrorText,
  fetchLoginUser,
  removeErrorText
} from '../../slices/exports';
import { useSelector, useDispatch } from '../../services/store';
export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorText = useSelector(selectErrorText);

  useEffect(() => {
    dispatch(removeErrorText());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password }));
    dispatch(removeErrorText());
  };

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
