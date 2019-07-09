const { sep } = require('path')

module.exports = ({ file }) => {
  let rootvalue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1
    ? 37.5
    : 75
  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootvalue,
        propList: ['*']
      }
    }
  }
}
