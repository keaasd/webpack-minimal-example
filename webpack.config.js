const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env, { mode }) => ({
  entry: './src/index.js',
  devtool: mode === 'development' ? 'source-map' : undefined,
  devServer: {
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]', // Все ассеты будут
    // складываться в dist/assets
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/template.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Формат имени файла
    }), // Добавляем в список плагинов    
    // new CleanWebpackPlugin(),
  ],
  
  module: {
    rules: [
      
      // JavaScript
      { 
        test: /\.(html)$/, 
        use: ['html-loader'] 
      }, // Добавляем загрузчик для html      
      {
        test: /\.js$/,
        exclude: /node_modules/, // не обрабатываем файлы из node_modules
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // Использование кэша для избежания рекомпиляции
            // при каждом запуске
          },
        },
      },
      {
        test: /\.jsx?$/, // обновляем регулярное выражение для поддержки jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"],        
      },
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        // type: 'javascript/auto'
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource', // В продакшен режиме
        // изображения размером до 8кб будут инлайнится в код
        // В режиме разработки все изображения будут помещаться в dist/assets
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },

    ],
  },
});
