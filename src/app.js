/**
 * App logic only goes here.
 * Defines routes, etc..
 * Doesn't start a server.
 */

const express = require( 'express' );

const routers = require( './routers' );

const validateLang = require( './middleware/validateLang' );

const app = express();

app.use( validateLang );

app.use( '/sports', routers.sports );

app.use( '/events', routers.events );

app.use( ( req, res ) => {
	res.status( 404 ).send( {
		status: 'error',
		error: 'Invalid endpoint: Not found.',
	} );
} );

module.exports = app;
