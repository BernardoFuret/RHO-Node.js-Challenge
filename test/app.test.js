const app = require( '../src/app' );

const nock = require( 'nock' );

const request = require( 'supertest' );

describe( 'app', () => {

	test( 'invalid route', async done => {
		const res = await request( app ).get( '/invalidRoute' );

		expect( res.status ).toBe( 404 );

		expect( res.body.status ).toEqual( 'error' );

		done();
	} );

} );
