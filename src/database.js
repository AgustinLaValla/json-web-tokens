const mongoose = require('mongoose');
const colors = require('colors');

mongoose.connect('mongodb://localhost/jwt-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`${colors.yellow('DABASE IS CONNECTED!')}`));