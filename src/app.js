const express = require( 'express' );

const routers = require( './routers' );

const port = process.env.PORT || 8080;

const app = express();

const LANGUAGES = require( './languages' );

for ( const language of LANGUAGES ) {
	app.use( `/${language}/sports`, routers.sports( language ) );

	app.use( `/${language}/events`, routers.events( language ) );
}

app.get( '/:lang/:any', ( req, res ) => {
	const message = `Invalid language: '${req.params.lang}'. Valid languages are ${LANGUAGES.map( lang => `'${lang}'` )}.`;

	res.json( {
		error: message,
	} );
} );

app.listen( port, err => {
	if ( err ) {
		throw err;
	}

	console.log( `Listening on port ${port}!` );
} );
