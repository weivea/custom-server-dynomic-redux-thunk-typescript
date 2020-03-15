const path = require('path');
const isProd = process.env.NODE_ENV === 'production'
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const withImages = require('next-images');
const withIFonts = require('next-fonts');
const withPlugins = require("next-compose-plugins");
let transpileModules = require('antd/package.json').dependencies;
transpileModules = Object.keys(transpileModules);

// next-transpile-modules 的目的就是让 node_modules 中的包可以使用 next-babel-loader 
const withTM = require('next-transpile-modules')(['antd', ...transpileModules]);

// antd组件库 主题: https://ant.design/docs/react/customize-theme-cn
const antdTheme = path.resolve(process.cwd(), 'antd-theme.less')


module.exports = withPlugins([withLess,withCss,withImages,withIFonts,withTM],{

  devIndicators: {
    autoPrerender: true, // 是否自动预渲染
  },

  // Use the CDN in production and localhost for development.
  // cdn静态资源前缀配置
  assetPrefix: isProd ? '' : '',
  cssLoaderOptions: {
    importLoaders: 1
  },
  lessLoaderOptions: {
    modifyVars: {
      'hack': `true; @import "${antdTheme}";`, // Override with less file
    },
    javascriptEnabled: true
  },
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.resolve.alias['stores'] = path.resolve(__dirname, 'stores');
    config.resolve.alias['pcomponents'] = path.resolve(__dirname, 'pcomponents');
    // console.log(config.resolve)
  
    // Important: return the modified config
    return config
  },
});