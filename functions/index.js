const server = require('firebase-admin');
server.initializeApp();

exports.onUserStatusChanged = require('./triggers/onUserStatusChanged');
exports.onMessageCleverBot = require('./triggers/onMessageCleverBot');

exports.helloWorld = require('./routes/helloWorld');