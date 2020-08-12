const app = require( '../../src/app' );

const request = require( 'supertest' );

jest.mock( '../../src/models/sports', () => ( {
	getAllSportsForAllLanguages: jest.fn( () => {
		throw new Error( 'Something unexpected happened' );
	} ),
} ) );

describe( 'util makeController', () => {

	test( 'with unexpected error (not ResponseError)', async done => {

		const res = await request( app ).get( '/sports' );

		expect( res.status ).toBe( 500 );

		expect( res.body.status ).toEqual( 'error' );

		done();
	} );

} );
