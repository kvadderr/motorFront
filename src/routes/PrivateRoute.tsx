import { Navigate, Outlet } from 'react-router-dom';
import { Props } from './types';

export const PrivateRoute = ({ isAuth }: Props) => {
  return isAuth ? <Outlet /> : <Navigate to="/signin" />;;
};
