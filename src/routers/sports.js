/**
 * Endpoint for `/sports`.
 */

const express = require( 'express' );

const router = express.Router();

router.get( '/', ( req, res ) => {
	const { lang } = req.query;

	res.json( {
		lang,
		type: 'sports',
	} );
} );

module.exports = router;
