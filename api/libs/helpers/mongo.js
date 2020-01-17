const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const config = require('./../config');
let options = config.get('/persistence/mongo');
let host = options['host'];
delete options['host'];
console.log(host, options);
module.exports = new MongooseAdapter(host, options);