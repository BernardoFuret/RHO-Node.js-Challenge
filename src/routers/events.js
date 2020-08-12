/**
 * Endpoint to deal with events.
 */

const express = require( 'express' );

const { makeController } = require( '../util' );

const EventsModel = require( '../models/events' );

const router = express.Router();

router.get( '/', makeController( ( req, res ) => {
	const { lang, sportId } = req.query;

	return EventsModel.getEvents( lang, sportId );
} ) );

router.get( '/:id', makeController( ( req, res ) => {
	const { id } = req.params;

	const { lang } = req.query;

	return EventsModel.getEvent( lang, id );
} ) );

module.exports = router;
