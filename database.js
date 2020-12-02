const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost/residential_passport', { useNewUrlParser: true })
    .then(() => {
      console.log('Successfully connected to mongodb....');
    })
    .catch(error => {
      console.error('Failed to connect to mongodb database: ', error);
    });
}