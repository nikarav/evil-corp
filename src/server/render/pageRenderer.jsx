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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  </body>
</html>`;
};

export default (store) => {
  const initialState = store.getState();
  const headAssets = Helmet.renderStatic();
  return buildPage({ initialState, headAssets });
};
