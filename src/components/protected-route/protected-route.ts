import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { selectIsAuthenticated } from '../../slices/burgerSlice';

type TProtectedRouteProps = {
  children: ReactElement;
};
const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
  const isAuth = useSelector(selectIsAuthenticated);
  return children;
};

export default ProtectedRoute;
