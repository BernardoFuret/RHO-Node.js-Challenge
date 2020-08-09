/**
 * Endpoint to deal with sports.
 */

const express = require( 'express' );

const DataService = require( '../services/data' );

const router = express.Router();

router.get( '/', async ( req, res ) => {
	const { lang } = req.query;

	try {
		const upstreamData = await DataService.fetch( lang );

		// TODO: split logic to a different module
		const data = upstreamData.sports
			.map( sport => ( {
				id: sport.id,
				pos: sport.pos,
				desc: sport.desc,
			} ) )
			.sort( ( s1, s2 ) => s1.pos - s2.pos )
		;

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
