const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    displayPicture: {
        type: String,
    },
});

module.exports = model('Users', UserSchema);