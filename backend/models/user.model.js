const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId

const userScheme = new Schema({
    _id: { type: objectId, auto: true, immutable: true },
    username: { type: String, required: true, immutable: true },
    password: { type: String, required: true, immutable: true },
    autoStart: { type: Boolean, required: true },
    totalRests: { type: Number, required: true },
    interval: { type: Number, requried: true }    
}, {
    versionKey: false
});

const user = mongoose.model('users', userScheme);
module.exports = user; 