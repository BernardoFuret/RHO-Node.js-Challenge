/**
 * Util functions.
 */

/**
 * Wrapper to allow throwing errors as if `throw`
 * was an expression.
 */
function doThrow( error ) {
	throw error;
}

/**
 * Function to sort by the "pos" field
 */
function sortByPos( o1, o2 ) {
	return o1.pos - o2.pos;
}

/**
 * This function receives a function that corresponds
 * to the data logic part of the controller.
 * This functions then deals with the error handling
 * and the response to be sent back to the caller.
 * It provides a steady (standard) interface for this API.
 */
function makeController( controller ) {
	return async ( req, res, next ) => {
		try {
			const data = await controller( req, res, next );

			res.json( {
				status: 'success',
				data,
			} );
		} catch ( e ) {
			console.error( 'Error while accessing', req.originalUrl, e );

			res.status( e.statusCode || 500 ).json( {
				status: 'error',
				error: e.message,
			} );
		}
	};
}

module.exports = {
	doThrow,
	sortByPos,
	makeController,

	Cache: require( './cache' ),
	ResponseError: require( './responseError' ),
};
