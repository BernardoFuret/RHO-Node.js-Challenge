const express = require( 'express' );

const routers = require( './routers' );

const validateLang = require( './middleware/validateLang' );

const port = process.env.PORT || 8080;

const app = express();

app.use( validateLang );

app.use( '/sports', routers.sports );

app.use( '/events', routers.events );

app.listen( port, err => {
	if ( err ) {
		throw err;
	}

	console.log( `Listening on port ${port}!` );
} );
