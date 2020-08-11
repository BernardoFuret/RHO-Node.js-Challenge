/**
 * Server logic goes here.
 */

const app = require( './app' );

const port = process.env.PORT || 8080;

const server = app.listen( port, err => {
	if ( err ) {
		throw err;
	}

	console.log( `Listening on port ${port}!` );
} );

module.exports = server;
