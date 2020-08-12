const app = require( '../../src/app' );

const nock = require( 'nock' );

const request = require( 'supertest' );

const lang = 'en-gb';

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

describe( 'events router', () => {

	describe( 'GET /events/:id', () => {

		test( 'with existent id', async () => {
			const mockEvent = mockResponseEn.result.sports[ 0 ].comp[ 0 ].events[ 0 ];

			nock( 'https://partners.betvictor.mobi' )
				.get( `/${lang}/in-play/1/events` )
				.reply( 200, mockResponseEn )
			;

			const res = await request( app ).get( `/events/${mockEvent.id}?lang=${lang}` );

			expect( res.status ).toBe( 200 );

			expect( res.body.status ).toEqual( 'success' );

			const responseEvent = res.body.data;

			expect( res.body.data.id ).toEqual( mockEvent.id );

			expect( responseEvent.desc ).toEqual( mockEvent.desc );
		} );

		test( 'with inexistent id', async done => {
			const mockEvent = mockResponseEn.result.sports[ 0 ].comp[ 0 ].events[ 0 ];

			nock( 'https://partners.betvictor.mobi' )
				.get( `/${lang}/in-play/1/events` )
				.reply( 200, mockResponseEn )
			;

			const res = await request( app ).get( `/events/0?lang=${lang}` );

			expect( res.status ).toBe( 404 );

			expect( res.body.status ).toEqual( 'error' );

			done();
		} );

	} );

} );
