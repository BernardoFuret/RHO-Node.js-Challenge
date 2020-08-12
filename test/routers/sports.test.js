const app = require( '../../src/app' );

const nock = require( 'nock' );

const request = require( 'supertest' );

const mockResponseEn = {
	'status': {
		'success': true,
		'errorCode': 0,
		'extraInfo': {},
	},
	'result': {
		'sports': [
			{
				'id':101,
				'desc':'Tennis',
				'pos':3,
			},
			{
				'id':100,
				'desc':'Football',
				'pos':1,
			},
		],
	},
};

const mockResponseDe = {
	'status': {
		'success': true,
		'errorCode': 0,
		'extraInfo': {},
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
};

describe( 'sports router', () => {

	describe( 'GET /sports', () => {

		test( 'with upstream error', async () => {
			nock( 'https://partners.betvictor.mobi' )
				.get( '/en-gb/in-play/1/events' )
				.reply( 500, {
					'status': {
						'success': false,
					},
				} )
			;

			const res = await request( app ).get( '/sports?lang=en-gb' );

			expect( res.status ).toBe( 500 );

			expect( res.body.status ).toEqual( 'error' );
		} );

		test( 'using English language', async () => {
			const lang = 'en-gb';

			nock( 'https://partners.betvictor.mobi' )
				.get( `/${lang}/in-play/1/events` )
				.reply( 200, mockResponseEn )
			;

			const res = await request( app ).get( `/sports?lang=${lang}` );

			expect( res.status ).toBe( 200 );

			expect( res.body.status ).toEqual( 'success' );

			expect( res.body.data.length ).toBe( 2 );

			expect( res.body.data[ 0 ] ).toEqual( mockResponseEn.result.sports[ 1 ] );
		} );

		test( 'using German language', async () => {
			const lang = 'de-de';

			nock( 'https://partners.betvictor.mobi' )
				.get( `/${lang}/in-play/1/events` )
				.reply( 200, mockResponseDe )
			;

			const res = await request( app ).get( `/sports?lang=${lang}` );

			expect( res.status ).toBe( 200 );

			expect( res.body.status ).toEqual( 'success' );

			expect( res.body.data.length ).toBe( 1 );

			expect( res.body.data[ 0 ] ).toEqual( mockResponseDe.result.sports[ 0 ] );
		} );

		test( 'without language', async done => {
			nock( 'https://partners.betvictor.mobi' )
				.get( '/en-gb/in-play/1/events' )
				.reply( 200, mockResponseEn )
			;

			nock( 'https://partners.betvictor.mobi' )
				.get( '/de-de/in-play/1/events' )
				.reply( 200, mockResponseDe )
			;

			const res = await request( app ).get( '/sports' );

			expect( res.status ).toBe( 200 );

			expect( res.body.status ).toEqual( 'success' );

			expect( res.body.data.length ).toBe( 3 );

			expect( res.body.data ).toEqual( [
				mockResponseEn.result.sports[ 1 ], // Football
				mockResponseDe.result.sports[ 0 ], // Fußball
				mockResponseEn.result.sports[ 0 ], // Tennis
			] );

			done();
		} );

	} );

} );
