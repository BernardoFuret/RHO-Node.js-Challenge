const app = require( '../../src/app' );

const nock = require( 'nock' );

const request = require( 'supertest' );

describe( 'validateLang middleware', () => {

	test( 'using invalid language', async () => {
		const lang = 'pt-pt';

		const res = await request( app ).get( `/events?lang=${lang}` );

		expect( res.status ).toBe( 400 );

		expect( res.body.status ).toEqual( 'fail' );
	} );

	test( 'using valid language', async done => {
		const lang = 'de-de';
		
		nock( 'https://partners.betvictor.mobi' )
			.get( `/${lang}/in-play/1/events` )
			.reply( 200, {
				'status': {
					'success': true,
				},
				'result': {
					'sports': [
						{
							'id':100,
							'desc':'Fußball',
							'pos':2,
						},
					],
				},
			} )
		;

		const res = await request( app ).get( `/sports?lang=${lang}` );

		expect( res.status ).toBe( 200 );

		expect( res.body.status ).toEqual( 'success' );

		done();
	} );

} );
