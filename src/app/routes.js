import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import MenuExample from './components/ActivitiesListView';

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
    {path: '/Reservations',
        component: HomePage,
        exact: true
    },
    {path: '/Offers',
        component: HomePage,
        exact: true
    },
    {path: '/MyWallet',
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
