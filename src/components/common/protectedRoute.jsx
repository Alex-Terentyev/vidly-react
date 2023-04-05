import React from 'react';
import auth from '../../services/authService';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({comp: Comp, ...rest}) => {
  return (
    <Route {...rest} 
        element={auth.getCurrentUser() 
            ? <Comp /> 
            : <Navigate to='/login' />} />
  )
}

export default ProtectedRoute;