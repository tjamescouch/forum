
const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');

//Fixes deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/forum');


var port = 5000;
app.set('port', port);


var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);

function onListening() {
  console.log(`Listening on port ${port}`);
}

function onError (e) {
 // Handle your error here
 console.error(e);
}
