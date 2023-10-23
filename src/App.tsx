import { ReactElement, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Signin from './pages/Auth/Signin'
import Register from './pages/Auth/Register';
import PrivateLayout from './layout/PrivateLayout';

import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';

import { useCurrentUserQuery } from './api/user';
import { selectIsAuthorized } from './store/slices/authSlice';
import { useAppSelector } from './store/storeHooks';

import './App.css'

function App(): ReactElement {

  const isAuth = useAppSelector(selectIsAuthorized);
  const { isLoading: userDataLoading } = useCurrentUserQuery();
  
  if (userDataLoading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <Suspense>
      <Routes>
        <Route path='/' element={<PrivateRoute isAuth={isAuth} />}>
          <Route path='/' element={<PrivateLayout />} />
        </Route>
        <Route path='/' element={<PublicRoute isAuth={isAuth} />}>
          <Route path='/signin' element={<Signin />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </Suspense>

  )
}

export default App
