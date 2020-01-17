const { Store } = require( 'confidence' );

const storeInstance = new Store();

storeInstance.load( require( './config.json' ) );

module.exports = storeInstance;
