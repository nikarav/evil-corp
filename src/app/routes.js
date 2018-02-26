import { connect } from 'react-redux';
import HomePage from './pages/HomePage';
import Contactpage from './pages/Contactpage';
import ProfilePage from './pages/ProfilePage';
import Users from './pages/Users';
import ActivitiesShow from './pages/ActivitiesShow';
import ActivityNew from './pages/ActivityNew';
import MapPage from './pages/MapPage';
import Test from './components/ActivitiesDetails';
import AdminPage from './pages/AdminPage';
import ResetProviderPage from './pages/ResetProviderPage';
import ResetParentPage from './pages/ResetParentPage';

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
      component: ActivitiesShow,
      exact: true
    },
    {
      path: '/MyProfile',
      component: ProfilePage,
      exact: true
    },
    {
      path: '/Contact',
      component: Contactpage,
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
    },
    {
      path: '/map',
      component: MapPage,
      exact: true
    },
    {
        path: '/act/:id',
        component: Test,
        exact: true
    },
    {
      path: '/admin',
      component: AdminPage,
      exact: true
    },
    {
      path: '/api/parent/reset/:id',
      component: ResetParentPage,
      exact: true
    },
    {
      path: '/api/provider/reset/:id',
      component: ResetProviderPage,
      exact: true
    },
    ];
export default routes;
