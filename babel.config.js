module.exports = {
  "env": {
    "development": {
      "presets": ["next/babel"]
    },
    "production": {
      "presets": ["next/babel"]
    },
    "test": {
      "presets": [["next/babel", { "preset-env": { "modules": "commonjs" } }]]
    }
  },
  "plugins":[  // 增加新的插件，这个插件就是让antd可以按需引入，包括css
    [
        "import",
        {
            "libraryName":"antd",
            "libraryDirectory": "es",
            "style":true  // 引入less
        }
    ]
  ]
}
