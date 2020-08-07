
const express = require( 'express' );

module.exports = language => {
	const eventsRouter = express.Router();

	eventsRouter.get( '/', ( req, res ) => {
		const sportId = req.query.sportId;

		res.json( {
			language,
			type: 'events',
			sportId,
		} );
	} );

	eventsRouter.get( '/:id', ( req, res ) => {
		const eventId = req.params.id;

		res.json( {
			language,
			type: 'events (data)',
			eventId,
		} );
	} );

	return eventsRouter;
};