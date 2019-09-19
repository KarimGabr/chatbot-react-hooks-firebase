require('isomorphic-fetch');

const functions = require('firebase-functions');
const server = require('firebase-admin');

const config = functions.config();
const db = server.firestore();

const BOT_API_KEY = config.cleverbot.bot_api_key;
const BOT_API_ID = config.cleverbot.bot_api_id;
const BOT_API_SESSION_ID = config.cleverbot.bot_api_session_id;

const bot = {
    uid: "cleverbot",
    displayName: "Clever Bot",
    photoURL: "https://i.imgur.com/ydOMC2c.png",
    status: {
        lastChanged: new Date(),
        state: "online"
    },
    channels: {
        general: true
    }
}

db.collection('users').doc(bot.uid).set(bot, { merge: true });

// this function run once to get the session id
// function initBot(){
//     const url = `https://botmakr.net/api/?key=${BOT_API_KEY}&id=${BOT_API_ID}&action=init`;
//         return fetch(url).then(res => {return res.json()});
// }

function sendMessageToBot(message){
    const url = `https://botmakr.net/api/?key=${BOT_API_KEY}&id=${BOT_API_ID}&sessionid=${BOT_API_SESSION_ID}&q=${encodeURIComponent(message)}`;
    return fetch(url).then(res => { return res.json() });
}

function sleep(){
    return new Promise(resolve => {
        setTimeout(resolve, Math.random() * 10000)
    })
}

module.exports = functions.firestore.document("channels/general/messages/{messageId}").onCreate((doc, context) => {
    // this function run once to get the session id
    // return initBot().then(botResponse => {
    //     console.log(botResponse); 
    // })

    let message = doc.data();
    
    if(!message.text.startsWith("@cleverbot"))  return sleep().then(() => { return });
    else message = message.text.replace(/^@cleverbot /, "");
    
    return sleep().then( () => {
        sendMessageToBot(message).then(botResponse => {
            return db.collection("channels/general/messages").add({
                text: botResponse.response,
                user: db.collection("users").doc("cleverbot"),
                createdAt: new Date()
            });
        });
    });
});