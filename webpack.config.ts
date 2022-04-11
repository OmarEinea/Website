import { resolve } from 'path';
import { WebpackConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

export default (_: any, { mode }: { mode: string }) => {
  const configs: WebpackConfiguration = {
    devServer: {
      static: { directory: resolve('dist') },
    },
    entry: './app/App.tsx',
    output: {
      path: resolve('dist'),
      filename: 'app.min.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }, {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: { url: false }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: { 'fetch': 'whatwg-fetch' },
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'app.min.css' }),
    ],
    optimization: {
      minimizer: [new TerserPlugin({ extractComments: false }), new CssMinimizerPlugin()],
    },
  };
  if (mode === 'production') {
    configs.externals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
      '@material-ui/core': 'MaterialUI'
    };
  }
  return configs;
};
