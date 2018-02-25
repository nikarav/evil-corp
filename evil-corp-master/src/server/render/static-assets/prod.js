import assets from '../../../public/assets/manifest.json';

const createAppScript = () => `<script async type="text/javascript" charset="utf-8" src="/assets/${assets['app.js']}"></script>`;

const createStylesheets = () => `
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" />
<link rel="stylesheet" href="/assets/${assets['app.css']}" />
`;

const createBootstrap = () => '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />';

export { createAppScript, createStylesheets, createBootstrap };

