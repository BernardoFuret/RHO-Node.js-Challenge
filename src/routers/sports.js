/**
 * Endpoint to deal with sports.
 */

const express = require( 'express' );

const SportsModel = require( '../models/sports' );

const router = express.Router();

router.get( '/', async ( req, res ) => {
	const { lang } = req.query;

	try {
		const data = await ( lang
			? SportsModel.getAllSports( lang )
			: SportsModel.getAllSportsForAllLanguages()
		);

		res.json( {
			status: 'success',
			data,
		} );
	} catch ( e ) {
		console.log( 'Error accessing data @sports', e );

		res.status( 500 ).json( {
			status: 'error',
			error: e.message,
		} );
	}
} );

module.exports = router;
