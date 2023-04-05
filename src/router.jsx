import { createBrowserRouter } from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import App from './App';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegistrationForm from './components/registrationForm';
import NotFound from './components/notFound';
import Logout from './components/logout';

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path:"/",
          element: <Navigate to="/movies" />
        },
        {
          path:"login",
          element: <LoginForm />
        },
        {
          path:"logout",
          element: <Logout />
        },
        {
          path:"movies",
          element: <Movies />,
        },
  
        {
          path:"movies/:id",
          element: <MovieForm />
        },
  
        {
          path:'customers',
          element: <Customers />
        },
        {
          path:'rentals',
          element: <Rentals />
        },
        {
          path:'register',
          element: <RegistrationForm />
        },
        {
          path: '*',
          element: <NotFound />
        },
        {
          path: 'notFound',
          element: <NotFound />
        }
      ]
    }
  ]);

export default router;