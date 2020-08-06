
const express = require( 'express' );

module.exports = language => {
	const sportsRouter = express.Router();
	
	sportsRouter.get( '/', ( req, res ) => {
		res.json( {
			language,
			type: 'sports',
		} );
	} );

	return sportsRouter;
};