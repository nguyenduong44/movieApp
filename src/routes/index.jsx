import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Details from '../pages/Details';
import Category from '../pages/Category';
import Search from '../pages/Search';
import Discover from '../pages/Discover';

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
  {
    path: '/discover',
    component: Discover
  },
];

const privateRoutes = [
  
];

export {publicRoutes, privateRoutes}