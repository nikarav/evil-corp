import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import staticAssets from './static-assets';

const buildPage = ({ initialState, headAssets }) => (componentHTML) => {
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${staticAssets.createStylesheets()}
  </head>
  <body>
    <div id="app">${componentHTML}</div>
    <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
    ${staticAssets.createAppScript()}
  </body>
</html>`;
};

export default (store) => {
  const initialState = store.getState();
  const headAssets = Helmet.renderStatic();
  return buildPage({ initialState, headAssets });
};

