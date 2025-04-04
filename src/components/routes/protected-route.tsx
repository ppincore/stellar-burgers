import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectIsInit } from '../../slices/exports';
import { Preloader } from '../ui/preloader';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: ReactElement;
  unAuth?: boolean;
};

export const ProtectedRoute = ({ children, unAuth }: ProtectedRouteProps) => {
  const isAuth = useSelector(selectIsAuthenticated);
  const isInit = useSelector(selectIsInit);
  const location = useLocation();
  if (isInit) return <Preloader />;

  if (!unAuth && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (unAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
export default ProtectedRoute;
