const mongoose = require('mongoose');

module.exports = async function() {
    try {
        const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
        await mongoose.connect('mongodb://localhost/residential_passport', options);
        
        console.log('Connected to MongoDB Database...')
    } catch (error) {
        console.error('Failed to connect to mongodb database: ', error);
    }
}