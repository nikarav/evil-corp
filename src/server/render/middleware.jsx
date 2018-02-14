import React from 'react';
import createMemoryHistory from 'history/createMemoryHistory';
import { renderToString } from 'react-dom/server';
import axios from 'axios';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import routes from '../../app/routes';
import configureStore from '../../app/store/configureStore';
import * as types from '../../app/types';
import pageRenderer from './pageRenderer';
import { sessionId } from '../../config/secrets';

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();

  // TODO Maybe we need to change store
  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true
    }
  }, history);

  /* Give the user's session to the server to use */
  if (req.cookies[sessionId]) {
    axios.defaults.headers.common.Cookie = sessionId + '=' + req.cookies[sessionId];
  }

  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({route, match}) => {
    const fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store, match) : Promise.resolve(null);
  });
  return Promise.all(promises).then((data) => {
    store.dispatch({ type: types.REQUEST_SUCCESS, data });
    const context = {};
    const componentHTML = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );

    if (context.status === 404) {
      res.status(404);
    }

    if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    const html = pageRenderer(store)(componentHTML);
    return res.send(html);
  }).catch((err) => {
    res.status(500).json(err);
  });
}
