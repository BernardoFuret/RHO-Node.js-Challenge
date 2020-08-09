/**
 * Model to handle logic about sports.
 */

const DataService = require( '../services/data' );

async function getAllSports( lang ) {
	const upstreamData = await DataService.fetch( lang );

	return upstreamData.sports
		.map( sport => ( {
			id: sport.id,
			pos: sport.pos,
			desc: sport.desc,
		} ) )
		.sort( ( s1, s2 ) => s1.pos - s2.pos )
	;
}

module.exports = {
	getAllSports,
};
