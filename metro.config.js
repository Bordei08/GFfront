// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// combinăm mai multe pattern-uri într-un singur RegExp
const combinedBlockList = new RegExp(
  [
    '.*\\/android\\/build\\/.*',              // build la proiect
    '.*\\/ios\\/Pods\\/.*',                   // Pods iOS
    'node_modules\\/.*\\/android\\/build\\/.*'// build-uri în pachete (ex. async-storage)
  ].join('|')
);

module.exports = mergeConfig(defaultConfig, {
  resolver: {
    resolverMainFields: ['react-native', 'browser', 'main'],
    blockList: combinedBlockList,
  },
});
