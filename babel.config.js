let plugins = [];
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
if(IS_PROD){
  plugins.push("transform-remove-console")
}
module.exports = {
  presets: [
    ['@vue/app',{"useBuiltIns": "entry"}]
  ],
  plugins: plugins
}