import { connect } from 'react-redux';
import HomePage from './pages/HomePage';
import ParentProfile from './pages/ParentProfile';
import Users from './pages/Users';
import MenuExample from './components/ActivitiesListView';
import ActivitiesShow from './pages/ActivitiesShow';
import ActivityNew from './pages/ActivityNew';

const routes = [
    {
      path: '/',
      component: HomePage,
      exact: true
    },
    {
      path: '/register',
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
      component: ParentProfile,
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
    },
    {
        path: '/provider/new',
        component: ActivityNew,
        exact: true
    }
    ];
export default routes;
