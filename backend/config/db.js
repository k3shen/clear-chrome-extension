const mongoose = require('mongoose');

const mongodb = process.env.MONGODB_URL;

mongoose.connect(mongodb)

mongoose.connection.on('error', err => {
    console.log(err);
})

mongoose.connection.on('connected', res => {
    console.log('Connected!')
})