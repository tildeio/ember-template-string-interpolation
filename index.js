'use strict';

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(_type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'string-interpolation',

      plugin: require('./lib/string-interpolation-plugin'),

      baseDir: function() {
        return __dirname;
      }
    });
  }
};
