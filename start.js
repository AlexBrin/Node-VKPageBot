const fs = require('fs');
const VK = require('VK-Promise');
const Bot = require('./utils/Bot');
const Event = require('./utils/Event/Event');

let config = fs.readFileSync('./config.json');
config = JSON.parse(config.toString());

let vk = new VK(config.token);

// vk.users.get()
//     .then(user => {
//         user = user[0];
//         console.log("\n> Бот: " + user.first_name + ' ' + user.last_name + "\n");
//
//         console.log('==================');
//         console.log('     РАБОТАЮ      ');
//         console.log('==================');
//     })
//     .catch(err => {
//         console.log(err)
//     });

vk.longpoll.start();
let bot = new Bot(vk, __dirname);

console.log('==================');
console.log('     РАБОТАЮ      ');
console.log('==================');

vk.on('*', function(event) {
    switch(event.eventName) {

        case 'update':
                event = event.data;
            break;

        case 'message':
                event = event.data.data;
            break;

        default:
            return;

    }

    let action = event.shift();
    bot.callEvent(action, Event.createEvent(action, event), config);

});