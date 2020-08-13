/**
 * Model to handle logic about events.
 */

const DataService = require( '../services/data' );

const { ResponseError, doThrow, sortByPos } = require( '../util' );

async function getEvents( lang, sportId ) {
	const upstreamData = await DataService.fetch( lang );

	const nSportId = parseInt( sportId );

	return upstreamData.sports
		.filter( sport => ( sportId == null ) || ( nSportId === sport.id ) )
		.sort( sortByPos )
		.flatMap( sport => sport.comp.sort( sortByPos ) )
		.flatMap( comp => comp.events.sort( sortByPos ) )
		.map( event => ( {
			id: event.id,
			pos: event.pos,
			desc: event.desc,
		} ) )
	;
}

async function getEvent( lang, eventId ) {
	const upstreamData = await DataService.fetch( lang );

	const nEventId = parseInt( eventId );

	return upstreamData.sports
		.flatMap( sport => sport.comp )
		.flatMap( comp => comp.events )
		.find( event => event.id === nEventId )
		||
		doThrow( new ResponseError( `Event with ID ${eventId} not found`, 404 ) )
	;
}

module.exports = {
	getEvents,
	getEvent,
};
