/**
 * Model to handle logic about sports.
 */

const DataService = require( '../services/data' );

const languages = require( '../resources/languages' );

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

async function getAllSportsForAllLanguages() {
	const allUpstreamData = await Promise.all( languages.map( lang => {
		return DataService.fetch( lang );
	} ) );

	return allUpstreamData
		.flatMap( upstreamData => {
			return upstreamData.sports.map( sport => ( {
				id: sport.id,
				pos: sport.pos,
				desc: sport.desc,
			} ) );
		} )
		.sort( ( s1, s2 ) => s1.pos - s2.pos )
	;
}

module.exports = {
	getAllSports,
	getAllSportsForAllLanguages,
};
