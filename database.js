const mongoose = require('mongoose');

module.exports = async function() {
    try {
        await mongoose.connect('mongodb://localhost/residential_passport', 
            { useNewUrlParser: true, useUnifiedTopology: true });
        
        console.log('Connected to MongoDB Database...')
    } catch (error) {
        console.error('Failed to connect to mongodb database: ', error);
    }
}