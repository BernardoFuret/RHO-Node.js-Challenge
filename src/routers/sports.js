/**
 * Endpoint for `/sports`.
 */

const express = require( 'express' );

const DataService = require( '../services/data' );

const router = express.Router();

router.get( '/', async ( req, res ) => {
	const { lang } = req.query;

	try {
		const data = await DataService.fetch( lang );

		res.json( {
			status: 'success',
			data: data.sports.map( sportData => ( { // TODO: split logic to a different module
				id: sportData.id,
				title: sportData.desc,
			} ) ),
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
