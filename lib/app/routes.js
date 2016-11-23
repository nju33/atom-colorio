'use babel';

const mainView = require('./views');

export default route => [
  route('/', mainView)
];
