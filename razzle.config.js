const path = require('path');
const glob = require('glob-all');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
};

module.exports = {
  modify: (config, { target, dev }, webpack) => {
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
