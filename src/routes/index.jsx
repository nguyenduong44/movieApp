import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Details from '../pages/Details';
import Category from '../pages/Category';

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
    path: '/details/:dataType/:movieId',
    component: Details
  },
  {
    path: '/:category',
    component: Category
  },
];

const privateRoutes = [
  
];

export {publicRoutes, privateRoutes}