const DbService	= require("moleculer-db");
const {MongoConnectionHelper} = require('./../libs/helpers');


module.exports = function(collection) {
    return {
        mixins: [DbService],
        adapter: MongoConnectionHelper,
        model: collection
    };
}