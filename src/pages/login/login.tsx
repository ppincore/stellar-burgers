import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { selectErrorText, fetchLoginUser } from '../../slices/burgerSlice';
import { useSelector, useDispatch } from '../../services/store';
export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorText = useSelector(selectErrorText);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password }));
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
