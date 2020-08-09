/**
 * Endpoint to deal with events.
 */

const express = require( 'express' );

const DataService = require( '../services/data' );

const router = express.Router();

router.get( '/', async ( req, res ) => {
	const { lang, sportId } = req.query;

	try {
		const upstreamData = await DataService.fetch( lang );

		const nSportId = parseInt( sportId );

		const data = upstreamData.sports
			.filter( sport => ( sportId == null ) || ( nSportId === sport.id ) )
			.flatMap( sport => sport.comp )
			.flatMap( comp => comp.events )
			.map( event => ( {
				id: event.id,
				pos: event.pos,
				desc: event.desc,
			} ) )
//			.sort( ( e1, e2 ) => e1.pos - e2.pos ) TODO: sort by grouping?
		;

		res.json( {
			status: 'success',
			data,
		} );
	} catch ( e ) {
		console.log( 'Error accessing data @events', e );

		res.status( 500 ).json( {
			status: 'error',
			error: e.message,
		} );
	}
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
