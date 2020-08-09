/**
 * Endpoint to deal with events.
 */

const express = require( 'express' );

const EventsModel = require( '../models/events' );

const router = express.Router();

router.get( '/', async ( req, res ) => {
	const { lang, sportId } = req.query;

	try {
		const data = await EventsModel.getEvents( lang, sportId );

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
		const data = await EventsModel.getEvent( lang, id );

		if ( data ) {
			res.json( {
				status: 'success',
				data,
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
