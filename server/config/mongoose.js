const mongoose = require('mongoose');
const keys = require('./keys');

function configureMongoose() {
  //Fixes deprecation warnings
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);

  mongoose.connect(keys.MongoURI)
          .then(() => console.log("MongoDB connected"))
          .catch(err => console.log(err));
}

module.exports = configureMongoose
