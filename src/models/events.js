/**
 * Model to handle logic about events.
 */

const DataService = require( '../services/data' );

const { ResponseError, doThrow } = require( '../util' );

async function getEvents( lang, sportId ) {
	const upstreamData = await DataService.fetch( lang );

	const nSportId = parseInt( sportId );

	return upstreamData.sports
		.filter( sport => ( sportId == null ) || ( nSportId === sport.id ) )
		.sort( ( s1, s2 ) => s1.pos - s2.pos )
		.flatMap( sport => sport.comp.sort( ( c1, c2 ) => c1.pos - c2.pos ) )
		.flatMap( comp => comp.events.sort( ( e1, e2 ) => e1.pos - e2.pos ) )
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
