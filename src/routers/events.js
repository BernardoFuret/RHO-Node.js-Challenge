/**
 * Endpoint to deal with events.
 */
// TODO: split logic to own module

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

router.get( '/:id', async ( req, res ) => {
	const { id } = req.params;

	const { lang } = req.query;

	try {
		const upstreamData = await DataService.fetch( lang );

		const nEventId = parseInt( id );
		
		const eventData = upstreamData.sports
			.flatMap( sport => sport.comp )
			.flatMap( comp => comp.events )
			.find( event => event.id === nEventId )
		;

		if ( eventData ) {
			res.json( {
				status: 'success',
				data: eventData,
			} );
		} else {
			res.status( 404 ).json( {
				status: 'error',
				error: `Event with ID ${id} not found.`,
			} );
		}
	} catch ( e ) {
		console.log( 'Error accessing data @events/:id', e );

		res.status( 500 ).json( {
			status: 'error',
			error: e.message,
		} );
	}
} );

module.exports = router;
