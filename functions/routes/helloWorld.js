const functions = require('firebase-functions');

module.exports = functions.https.onRequest((request, response) => {
    console.log("Hello from Firebase");
    response.send(config.cleverbot.key);
});