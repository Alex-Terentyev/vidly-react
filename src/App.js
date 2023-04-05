import React, { useEffect } from 'react';
import './App.css';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import auth from './services/authService';

import NavMenu from './components/navMenu';
// import ProtectedRoute from './components/common/protectedRoute';

//Components
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegistrationForm from './components/registrationForm';
import NotFound from './components/notFound';
import Logout from './components/logout';





function App() {
  const [ user, setUser ] = useState('');

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, [ ]);
 
  return (
    <>    
      <ToastContainer />
      <NavMenu user={user}/>
      <main className='container'>
        <Routes>
          <Route path='/' element={<Navigate to='/movies' />} />
          <Route path='/movies' element={<Movies user={user} />} />
          <Route path='/movies/:id' element={user 
            ? <MovieForm/> 
            : <Navigate to="/login" state={'s'} replace={true} />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/rentals' element={<Rentals />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>  
    </>
  );
}

export default App;
