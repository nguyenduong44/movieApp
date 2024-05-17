import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Details from '../pages/Details';
import Category from '../pages/Category';
import Search from '../pages/Search';
import Discover from '../pages/Discover';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Settings from '../pages/Settings';
import Favorite from '../pages/Favorite';
import Videos from '../pages/Videos';


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
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/settings',
    component: Settings
  },
  {
    path: '/favorite',
    component: Favorite
  },
  {
    path: '/:dataType/:movieId/videos',
    component: Videos
  }
];

const privateRoutes = [
  
];

export {publicRoutes, privateRoutes}