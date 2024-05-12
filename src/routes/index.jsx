import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Details from '../pages/Details';
import Category from '../pages/Category';
import Search from '../pages/Search';

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
  {
    path: '/search',
    component: Search
  },
];

const privateRoutes = [
  
];

export {publicRoutes, privateRoutes}