const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roomSchema = new Schema({
    roomid: {
        type: String
    },
    conversation: [{
        index: { type: Number },
        username: { type: String },
        text: { type: String }           
    }],
})

module.exports = mongoose.model('Room', roomSchema)