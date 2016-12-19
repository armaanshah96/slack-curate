// 'use strict';
// require('dotenv').config();
// var slack = require('express-slack');
// var express = require('express');
// var app = express();
// const PORT = process.env.PORT || 3000;
// const SCOPE = process.env.SCOPE;
// const TOKEN = process.env.TOKEN;
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// // console.log(PORT);

// // console.log(process.env);
// // the path for OAuth, slash commands, and event callbacks 
// app.use('/slack', slack({
//   scope: SCOPE,
//   token: TOKEN,
//   store: 'data.json',
//   client_id: CLIENT_ID,
//   client_secret: CLIENT_SECRET
// }));
// // scope : commands
// // store : data.json
 
// // handle the "/test-curate" slash commands 
// slack.on('/test-curate', (payload, bot) => {
//   bot.reply('works!');
// });

// // handle the "/curate" slash commands 
// slack.on('/curate', (payload, bot) => {

// });

// // handle the "/curate-daily" slash commands 
// slack.on('/curate-daily', (payload, bot) => {
//   bot.reply('works!');
// });
 
// let message = {
//   unfurl_links: true,
//   channel: 'C1V6A3BKN',
//   token: TOKEN,
//   text: "Curate Bot has just connected",
//   attachments: [{
//     text: "And here's an attachment!"
//   }]
// }
 
// // send message to any Slack endpoint 
// slack.send('chat.postMessage', message).then(data => {
//   // Success! 
// });

// app.listen(PORT, () => {
//   console.log(`Server started on ${PORT}`);
// });