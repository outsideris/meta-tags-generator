module.exports = function (grunt, options) {
  'use strict';

  return {
    options: {
      jshintrc: true
    },
    js: {
      src: ['js/**/*.js']
    }
  };
};
