/**
 * Error to be converted to an API response.
 */
class ResponseError extends Error {

	constructor( message, statusCode = 500 ) {
		super( message );

		this.statusCode = statusCode;
	}

}

module.exports = ResponseError;
