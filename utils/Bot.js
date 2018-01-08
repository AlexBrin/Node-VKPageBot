const fs = require('fs');
const Event = require('./Event/Event');

class Bot {
    static get EVENT_COMMAND() { return 200; }

    static get EVENT_UPDATE_FLAG_MESSAGE() { return 1; }
    static get EVENT_SET_FLAG_MESSAGE() { return 2; }
    static get EVENT_REPLACE_FLAG_MESSAGE() { return 3; }
    static get EVENT_NEW_MESSAGE() { return 4; }
    static get EVENT_EDIT_MESSAGE() { return 5; }
    static get EVENT_READ_ONPUT() { return 6; }
    static get EVENT_READ_OUTPUT() { return 7; }
    static get EVENT_FRIEND_ONLINE() { return 8; }
    static get EVENT_FRIEND_OFFLINE() { return 9; }
    static get EVENT_CHAT_CHANGE() { return 51; }
    static get EVENT_USER_WRITING() { return 61; }
    static get EVENT_USER_CHAT_WRITING() { return 62; }

    static get PLATFORM() {
        return {
            1: 'Мобильная версия или неопознанное приложение',
            2: 'iPhone',
            3: 'iPad',
            4: 'Android',
            5: 'Windows Phone',
            6: 'Windows 8/10',
            7: 'Полная версия или неопознанное приложение'
        };
    };

    constructor(vk, dirname, config) {
        this.vk = vk;
        this.config = config;
        this.dirname = dirname + '/';
        this.modulePath = this.dirname + 'Modules/';

        this.modules = {};

        this.registerModules();
    }

    registerModules() {
        const modules = fs.readdirSync(this.modulePath);
        modules.forEach((module) => {
            const moduleDir = this.modulePath + module + '/index';
            const moduleClass = require(moduleDir);
            try {
                this.modules[module] = new moduleClass(this.vk, moduleDir);
                console.log("> Модуль " + module + " загружен");
            }
            catch(error) {
                console.log("> Ошибка загрузки модуля " + module);
                console.log(error);
            }
        });
    }

    callEvent(action, event, config) {
        if(!event)
            return;

        for(let module in this.modules) {
            this.modules[module].onEvent(event, new Event(event.data));
        }

        switch(action) {
            case Bot.EVENT_UPDATE_FLAG_MESSAGE:
                    for(let module in this.modules) {
                        this.modules[module].onUpdateFlag(event);
                    }
                break;

            case Bot.EVENT_SET_FLAG_MESSAGE:
                    for(let module in this.modules) {
                        this.modules[module].onSetFlag(event);
                    }
                break;

            case Bot.EVENT_REPLACE_FLAG_MESSAGE:
                    for(let module in this.modules) {
                        this.modules[module].onReplaceFlag(event);
                    }
                break;

            case Bot.EVENT_NEW_MESSAGE:
                    for(let module in this.modules) {
                        if(event.getMessage()[0] === '/') {
                            this.callEvent(Bot.EVENT_COMMAND, Event.createEvent(Bot.EVENT_COMMAND, event));
                            if(config['onCommandStop'])
                                return false;
                        }

                        this.modules[module].onMessage(event);
                    }
                break;

            case Bot.EVENT_COMMAND:
                    for(let module in this.modules) {
                        this.modules[module].onCommand(event, event.getCommand(), event.getArgs());
                    }
                break;

            case Bot.EVENT_EDIT_MESSAGE:
                    for(let module in this.modules) {
                        this.modules[module].onEditMessage(event);
                    }
                break;

            case Bot.EVENT_READ_ONPUT:
                for(let module in this.modules) {
                        this.modules[module].onReadOutput(event);
                    }
                break;

            case Bot.EVENT_READ_OUTPUT:
                    for(let module in this.modules) {
                        this.modules[module].onReadInput(event);
                    }
                break;

            case Bot.EVENT_FRIEND_ONLINE:
                    for(let module in this.modules) {
                        this.modules[module].onFriendOnline(event);
                    }
                break;

            case Bot.EVENT_FRIEND_OFFLINE:
                    for(let module in this.modules) {
                        this.modules[module].onFriendOffline(event);
                    }
                break;

            case Bot.EVENT_CHAT_CHANGE:
                    for(let module in this.modules) {
                        this.modules[module].onChatChange(event);
                    }
                break;

            case Bot.EVENT_USER_WRITING:
                    for(let module in this.modules) {
                        this.modules[module].onUserWrite(event);
                    }
                break;

            case Bot.EVENT_USER_CHAT_WRITING:
                    for(let module in this.modules) {
                        this.modules[module].onUserWriteInChat(event);
                    }
                break;


        }
    }

    static getPlatformId(extra) {
        return extra & 0xFF;
    }

    static getPlatform(extra) {
        return Bot.PLATFORM[Bot.getPlatformId(extra)];
    }

}

module.exports = Bot;