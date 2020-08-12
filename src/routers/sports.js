/**
 * Endpoint to deal with sports.
 */

const express = require( 'express' );

const SportsModel = require( '../models/sports' );

const { makeController } = require( '../util' );

const router = express.Router();

router.get( '/', makeController( ( req, res ) => {
	const { lang } = req.query;

	return lang
		? SportsModel.getAllSports( lang )
		: SportsModel.getAllSportsForAllLanguages()
	;
} ) );

module.exports = router;
