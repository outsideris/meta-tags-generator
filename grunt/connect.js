module.exports = function (grunt, options) {
  'use strict';

  return {
    server: {
      options: {
        base: "",
        hostname: "*",
        port: 9999
      }
    }
  };
};
