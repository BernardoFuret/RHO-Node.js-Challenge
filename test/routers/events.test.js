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
		'total_number_of_events': 1,
		'sports': [
			{
				'id': 100,
				'desc': 'Football',
				'comp': [
					{
						'pos': 14,
						'events': [
							{
								'id': 12,
								'desc': 'FC1 vs. FC2',
								'pos': 9999,
							},
						],
					},
				],
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
		'total_number_of_events': 1,
		'sports': [
			{
				'id': 100,
				'desc': 'Fußball',
				'comp': [
					{
						'pos': 14,
						'events': [
							{
								'id': 13,
								'desc': 'FC1 vs. FC2',
								'pos': 9999,
							},
						],
					},
				],
			},
		],
	},
};

describe( 'events router', () => {

	describe( 'GET /events', () => {

		test( 'with upstream error', async () => {
			const lang = 'en-gb';

			nock( 'https://partners.betvictor.mobi' )
				.get( `/${lang}/in-play/1/events` )
				.reply( 200, {
					'status': {
						'success': false,
						'errorCode': 'X',
					},
				} )
			;

			const res = await request( app ).get( `/events?lang=${lang}` );

			expect( res.status ).toBe( 500 );

			expect( res.body.status ).toEqual( 'error' );
		} );

		test( 'using English language', async () => {
			const lang = 'en-gb';

			nock( 'https://partners.betvictor.mobi' )
				.get( `/${lang}/in-play/1/events` )
				.reply( 200, mockResponseEn )
			;

			const res = await request( app ).get( `/events?lang=${lang}` );

			expect( res.status ).toBe( 200 );

			expect( res.body.status ).toEqual( 'success' );

			expect( res.body.data.length ).toBe( mockResponseEn.result.total_number_of_events );

			expect( res.body.data[ 0 ] ).toEqual( mockResponseEn.result.sports[ 0 ].comp[ 0 ].events[ 0 ] );
		} );

		test( 'using German language', async () => {
			const lang = 'de-de';

			nock( 'https://partners.betvictor.mobi' )
				.get( `/${lang}/in-play/1/events` )
				.reply( 200, mockResponseDe )
			;

			const res = await request( app ).get( `/events?lang=${lang}` );

			expect( res.status ).toBe( 200 );

			expect( res.body.status ).toEqual( 'success' );

			expect( res.body.data.length ).toBe( mockResponseDe.result.total_number_of_events );

			expect( res.body.data[ 0 ] ).toEqual( mockResponseDe.result.sports[ 0 ].comp[ 0 ].events[ 0 ] );
		} );

		test( 'without language', async () => {
			const res = await request( app ).get( '/events' );

			expect( res.status ).toBe( 400 );

			expect( res.body.status ).toEqual( 'error' );
		} );

		test( 'with sportId', async done => {
			const lang = 'de-de';

			const sportId = mockResponseDe.result.sports[ 0 ].id;

			const mockEvent = mockResponseDe.result.sports[ 0 ].comp[ 0 ].events[ 0 ];

			nock( 'https://partners.betvictor.mobi' )
				.get( `/${lang}/in-play/1/events` )
				.reply( 200, mockResponseDe )
			;

			const res = await request( app ).get( `/events?lang=${lang}&sportId=${sportId}` );

			expect( res.status ).toBe( 200 );

			expect( res.body.status ).toEqual( 'success' );

			expect( res.body.data.length ).not.toBe( 0 );

			done();
		} );

	} );

} );
