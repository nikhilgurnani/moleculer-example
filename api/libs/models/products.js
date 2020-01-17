const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});
module.exports = model('Products', ProductSchema);