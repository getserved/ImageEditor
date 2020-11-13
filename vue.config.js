// vue.config.js
module.exports = {
  publicPath: `ImageEditor`,
  pluginOptions: {
	    'style-resources-loader': {
	      preProcessor: 'scss',
	      patterns: [
	        path.resolve(__dirname, 'src/assets/scss/resources.scss'),
	      ]
	    }
	  }
}
