const { override, addDecoratorsLegacy, addBabelPlugin  } = require('customize-cra');

module.exports = override(
  addDecoratorsLegacy(),
  addBabelPlugin([
    "import",
    {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css"
    }
  ]),
);