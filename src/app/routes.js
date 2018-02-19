import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import Users from './components/Users'

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    path: '/nav',
    component: Navigation,
    exact: true
  },
  {
    path: '/users',
    component: Users,
    exact: true
  }
];

export default routes;
