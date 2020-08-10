/**
 * Service to fetch upstream data.
 */

const fetch = require( 'node-fetch' ).default; // Workaround for https://github.com/node-fetch/node-fetch/issues/450

const Cache = require( '../util/cache' );

const headers = {
	'User-Agent': 'RHO Node.js Chalenge (+https://github.com/BernardoFuret/RHO-Node.js-Challenge)',
};

function makeUrl( lang ) {
	return `https://partners.betvictor.mobi/${lang}/in-play/1/events`;
}

function checkStatus( url ) {
	return r => {
		if ( r.ok ) {
			return r;
		} else {
			throw new Error( `Error accessing ${url}. ${r.status}: ${r.statusText}` );
		}
	};
}

class DataService {

	constructor() {
		this.cache = new Cache( 5 * 60 * 1000 );
	}

	async fetch( lang ) {
		return this.cache.get( lang, async () => {
			const url = makeUrl( lang );

			const { status, result } = await fetch( url, { headers } )
				.then( checkStatus( url ) )
				.then( r => r.json() )
			;

			if ( !status.success ) {
				throw new Error( `No success. Error code: ${result.errorCode}` );
			}

			return result;
		} );
	}

}

module.exports = new DataService();
