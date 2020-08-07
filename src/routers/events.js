/**
 * Endpoint for `/events`.
 */

const express = require( 'express' );

const router = express.Router();

router.get( '/', ( req, res ) => {
	const { lang, sportId } = req.query;

	res.json( {
		lang,
		sportId,
		type: 'events',
	} );
} );

router.get( '/:id', ( req, res ) => {
	const { id } = req.params;

	const { lang } = req.query;

	res.json( {
		lang,
		id,
		type: 'specific event',
	} );
} );

module.exports = router;
