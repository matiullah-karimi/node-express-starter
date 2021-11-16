(async function() {
    require('dotenv').config();
    await require('../database')();

    // Add seeders here...
    require('./user.seeder').seed();
}());