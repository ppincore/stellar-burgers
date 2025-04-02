import React, { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { selectIsAuthenticated, selectIsInit } from '../../slices/exports';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  children: ReactElement;
  unAuth?: boolean;
};

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({
  children,
  unAuth
}) => {
  const path = useLocation().state?.from || '/';
  const isAuth = useSelector(selectIsAuthenticated);
  const isInit = useSelector(selectIsInit);
  const check = unAuth && isAuth
  // console.log(isAuth)
  if (isInit) return <Preloader />;
  if (!unAuth && !isAuth) return <Navigate replace to='/login' />;
  if (unAuth) return <Navigate replace to={path} />;
  console.log(!!check);
  return children;
};

export default ProtectedRoute;
