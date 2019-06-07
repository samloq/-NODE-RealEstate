const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let Annoucment = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    title: {
    	type: String
    },
    state: {
    	type: String
    },
    price: {
        type: Number
    },
    mortgage: {
        type: String
    },
    sqft: {
        type: Number
    },
    rooms: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    property: {
        type: String
    },
    description: {
        type: String
    },
    created: {
    	type: Date
    },
});

module.exports = mongoose.model('Annoucment', Annoucment);