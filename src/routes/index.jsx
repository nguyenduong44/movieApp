import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Details from '../pages/Details';

const publicRoutes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/details/:movieId',
    component: Details
  }
];

const privateRoutes = [
  
];

export {publicRoutes, privateRoutes}