const path = require('path');
const glob = require('glob-all');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const herokuPlugin = require('./.razzle/heroku-plugin')

const PATHS = {
  src: path.join(__dirname, 'src'),
};

module.exports = {
  modify: (config, { target, dev }, webpack) => {

    // razzle doesn't work on heroku deploys because of process.env.PORT build issue
    config = herokuPlugin(config, {target, dev}, webpack);

    const appConfig = Object.assign({}, config);

    // for prod, removing all unnecessary css with purge css
    if (!dev && target === 'web') {
      appConfig.plugins.push(
        new PurgecssPlugin({
          paths: () => glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
      );
    }

    return appConfig;
  }
};
