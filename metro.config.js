const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");


const defaultConfig = getDefaultConfig(__dirname);


const combinedBlockList = new RegExp(
  [
    ".*\\/android\\/build\\/.*",              
    ".*\\/ios\\/Pods\\/.*",                   
    "node_modules\\/.*\\/android\\/build\\/.*" 
  ].join("|")
);


const svgAndResolverConfig = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],

    resolverMainFields: ["react-native", "browser", "main"],

    blockList: combinedBlockList,
  },
};

module.exports = mergeConfig(defaultConfig, svgAndResolverConfig);
