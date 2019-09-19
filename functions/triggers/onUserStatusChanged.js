const functions = require('firebase-functions');
const server = require('firebase-admin');
const db = server.firestore();

module.exports = functions.database.ref("status/{userId}").onUpdate((change, context) => {
    const eventStatus = change.after.val();
    const userDoc = db.doc(`users/${context.params.userId}`);

    return change.after.ref.once("value").then(snapshot => {
        const status = snapshot.val();
        if(status.lastChanged > eventStatus.lastChanged) return;

        eventStatus.lastChanged = new Date(eventStatus.lastChanged);
        userDoc.update({ status: eventStatus });
    });
});