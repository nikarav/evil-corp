import { connect } from 'react-redux';
import HomePage from './pages/HomePage';
import Navigation from './containers/Navigation';
import Users from './pages/Users';
import MenuExample from './components/ActivitiesListView';
import ActivitiesShow from './pages/ActivitiesShow';

const routes = [
    {
      path: '/',
      component: MenuExample,
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
    },
    {
      path: '/Reservations',
      component: HomePage,
      exact: true
    },
    {
      path: '/Offers',
      component: HomePage,
      exact: true
    },
    {
      path: '/MyWallet',
      component: HomePage,
      exact: true
    },
    {
      path: '/Contact',
      component: HomePage,
      exact: true
    },
    {
        path: '/act',
        component: ActivitiesShow,
        exact: true
    }
    ];
export default routes;
