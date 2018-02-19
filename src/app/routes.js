import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import SignUp from './components/SignUp'

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
    path: '/signup',
    component: SignUp,
    exact: true
  }
];

export default routes;
