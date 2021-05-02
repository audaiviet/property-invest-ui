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
       "@components": path.resolve(__dirname, "../components")
     }
     return config;
   }
}