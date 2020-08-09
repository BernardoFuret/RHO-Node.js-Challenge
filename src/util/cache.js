/**
 * Cache to store full payload from upstream API.
 * The data changes often. So to keep data consistency,
 * it's better to store the whole data. This way, when
 * it is manipulated for different calls, it is consistent.
 */

class Cache {

	constructor( ttl ) {
		this.ttl = ttl;

		this.cache = new Map();
	}

	expired( key ) {
		return ( this.cache.get( key ).setTime + this.ttl ) < Date.now();
	}

	async get( key, onMiss ) {
		if ( !this.cache.has( key ) || this.expired( key ) ) {
			const result = await onMiss();

			this.cache.set( key, {
				setTime: Date.now(),
				data: result,
			} );
		}

		return this.cache.get( key ).data;
	}

}

module.exports = Cache;
