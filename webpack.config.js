const path = require( 'path' );

const NodemonPlugin = require( 'nodemon-webpack-plugin' );

module.exports = {
	mode: 'development',
	entry: './src/app.js',
	target: 'node',
	output: {
		filename: 'main.js',
		path: path.resolve( __dirname, 'dist' ),
	},
	plugins: [
		new NodemonPlugin(),
	],
};