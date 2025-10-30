const path = require('path');

module.exports = {
  entry: {
    app: './js/apiProject.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/apiProject.js',
  },
};
