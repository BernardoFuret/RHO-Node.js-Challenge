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
		'total_number_of_events': 4,
		'sports': [
			{
				'id': 100,
				'desc': 'Football',
				'pos': 2,
				'comp': [
					{
						'pos': 13,
						'events': [
							{
								'id': 121,
								'desc': 'FC1 vs. FC2',
								'pos': 1111,
							},
						],
					},
				],
			},
			{
				'id': 100,
				'desc': 'Tennis',
				'pos': 1,
				'comp': [
					{
						'pos': 14,
						'events': [
							{
								'id': 122,
								'desc': 'FC3 vs. FC4',
								'pos': 9999,
							},
						],
					},
					{
						'pos': 12,
						'events': [
							{
								'id': 123,
								'desc': 'FC5 vs. FC6',
								'pos': 3333,
							},
							{
								'id': 124,
								'desc': 'FC7 vs. FC8',
								'pos': 2222,
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

		test( 'with unsuccessful upstream response', async () => {
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

		test( 'using a language', async () => {
			const lang = 'en-gb';

			nock( 'https://partners.betvictor.mobi' )
				.get( `/${lang}/in-play/1/events` )
				.reply( 200, mockResponseEn )
			;

			const res = await request( app ).get( `/events?lang=${lang}` );

			expect( res.status ).toBe( 200 );

			expect( res.body.status ).toEqual( 'success' );
		} );

		test( 'sorting of returned events', async () => {
			const lang = 'en-gb';

			nock( 'https://partners.betvictor.mobi' )
				.get( `/${lang}/in-play/1/events` )
				.reply( 200, mockResponseEn )
			;

			const res = await request( app ).get( `/events?lang=${lang}` );

			expect( res.status ).toBe( 200 );

			expect( res.body.status ).toEqual( 'success' );

			expect( res.body.data.length ).toBe( mockResponseEn.result.total_number_of_events );

			expect( res.body.data ).toEqual( [
				{
					'id': 124,
					'desc': 'FC7 vs. FC8',
					'pos': 2222,
				},
				{
					'id': 123,
					'desc': 'FC5 vs. FC6',
					'pos': 3333,
				},
				{
					'id': 122,
					'desc': 'FC3 vs. FC4',
					'pos': 9999,
				},
				{
					'id': 121,
					'desc': 'FC1 vs. FC2',
					'pos': 1111,
				},
			] );
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
