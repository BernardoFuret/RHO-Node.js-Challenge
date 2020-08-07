const express = require( 'express' );

const port = process.env.PORT || 8080;

const app = express();

app.get( '/sports', ( req, res ) => {
	const { lang } = req.query;

	res.json( {
		lang,
		type: 'sports',
	} );
} );

app.get( '/events', ( req, res ) => {
	const { lang, sportId } = req.query;

	res.json( {
		lang,
		sportId,
		type: 'events',
	} );
} );

app.get( '/events/:id', ( req, res ) => {
	const { id } = req.params;

	const { lang } = req.query;

	res.json( {
		lang,
		id,
		type: 'specific event',
	} );
} );

app.listen( port, err => {
	if ( err ) {
		throw err;
	}

	console.log( `Listening on port ${port}!` );
} );