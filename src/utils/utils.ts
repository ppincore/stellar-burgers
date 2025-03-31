import { useLocation } from 'react-router-dom';

export const page = (pageName: string): boolean => {
  const location = useLocation();
  return pageName === '/'
    ? location.pathname === pageName
    : location.pathname.includes(pageName);
};
