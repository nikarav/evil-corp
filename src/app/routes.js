import HomePage from './components/HomePage';
import Navigation from './components/Navigation';

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
  }
];

export default routes;
