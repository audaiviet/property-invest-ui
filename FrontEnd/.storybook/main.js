const path = require("path");

module.exports = {
  "stories": [
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
       ...config.resolve.alias,
       "assets": path.resolve(__dirname, "../assets"),
       "@components": path.resolve(__dirname, "../components")
     }
     return config;
   }
}