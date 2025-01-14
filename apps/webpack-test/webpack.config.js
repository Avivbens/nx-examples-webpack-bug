const { env } = require('node:process')
const { composePlugins, withNx } = require('@nx/webpack')
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin')
const { join } = require('node:path')

const isDevelopment = env.NODE_ENV === 'development'


/* ------------------------------------ */
/* ------ Breakpoints Issues ---------- */
/* ------------------------------------ */

module.exports = composePlugins(withNx({}), (config) => {
  return {
    ...config,
    devtool: isDevelopment && 'source-map',
  }
})

/* ------------------------------------ */
/* -------- Reload Issues ------------- */
/* ------------------------------------ */

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/webpack-test'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};


/* ------------------------------------ */
/* -------- Patch solution ------------ */
/* ------------------------------------ */

// module.exports = composePlugins(withNx({}), (config) => {
//   delete config.context;

//   return {
//     ...config,
//     plugins: [new NxAppWebpackPlugin({})],
//     devtool: isDevelopment && 'source-map',
//   };
// });
