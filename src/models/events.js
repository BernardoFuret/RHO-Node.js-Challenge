/**
 * Model to handle logic about events.
 */

const DataService = require( '../services/data' );

async function getEvents( lang, sportId ) {
	const upstreamData = await DataService.fetch( lang );

	const nSportId = parseInt( sportId );

	return upstreamData.sports
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
}

async function getEvent( lang, eventId ) {
	const upstreamData = await DataService.fetch( lang );

	const nEventId = parseInt( eventId );

	return upstreamData.sports
		.flatMap( sport => sport.comp )
		.flatMap( comp => comp.events )
		.find( event => event.id === nEventId )
	;
}

module.exports = {
	getEvents,
	getEvent,
};
