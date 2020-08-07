/**
 * Middleware to validate the language used.
 */

const languages = require( '../resources/languages' );

module.exports = ( req, res, next ) => {
	const { lang } = req.query;

	if ( lang == null || languages.includes( lang ) ) {
		next();
	} else {
		const validLangs = languages.map( lang => `'${lang}'` ).join( ', ' );

		res.status( 400 ).json( {
			status: 'fail',
			message: `Invalid \`lang\`: '${lang}'. Valid languages are ${validLangs}.`,
		} );
	}
};