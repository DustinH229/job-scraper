const path = require('path');
const crypto = require('crypto');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractMinCSS = new ExtractTextPlugin('../css/[name].min.css');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		'job-scraper' : [
			'./css/job-scraper-display.css',
			'./css/job-scraper-modal.css'
		]
	},
	'output': {
		filename: '[name].js',
		path: path.join(__dirname, '/dist/'),
		hashFunction: 'sha256'
	},
	'module' : {
		rules: [
			{
				test: /\.(css)/,
		      use: ExtractMinCSS.extract({
			    fallback: 'style-loader',
			    use: [
			      {
			        loader: 'css-loader',
			        options: {
			          minimize: true,
			          optimize: true,
			          comments: false
			        }
			      },
			      {
			      	loader: 'postcss-loader',
			      },
			    ]
			  })
		  },
		]
	},
	optimization: {
		minimize: false
	},
  	plugins: [
	    ExtractMinCSS,
	    new OptimizeCSSAssets()
	]
}