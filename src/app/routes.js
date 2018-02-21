import HomePage from './pages/HomePage';
import Users from './pages/Users'
import MenuExample from './components/ActivitiesListView';

const routes = [
    {
      path: '/',
      component: MenuExample,
      exact: true
    },
    {
    path: '/nav',
    component: HomePage,
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
    }
    ];
export default routes;
