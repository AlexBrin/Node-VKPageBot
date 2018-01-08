const fs = require('fs');

class Module {

    constructor(vk, pluginDir) {
        this.vk = vk;
        this.pluginDir = pluginDir + '/';
    }

    getDataPath() {
        return this.pluginDir;
    }

    getVk() {
        return this.vk;
    }

    readConfig(toJson = true) {
        const configFile = this.getDataPath() + 'config.json';
        if(!fs.existsSync(configFile))
            fs.writeFileSync(configFile, '{}');

        let config = fs.readFileSync(this.getDataPath() + 'config.json');
        if(toJson)
            config = JSON.parse(config);

        return config;
    }

    sendMessage(peerId, message, data = {}) {
        const vk = this.getVk();
        data.peer_id = peerId;
        if(!('message' in data))
            data.message = message;

        return new Promise(function(fulfilled, reject) {
            vk.messages.send(data)
                .then(fulfilled)
                .catch(reject);
        });
    }

    getUserInfo(userId, data = {}) {
        const vk = this.getVk();
        data.user_ids = userId;
        return new Promise(function(fulfilled, reject) {
            vk('users.get', data)
                .then((user) => {
                    fulfilled(user[0]);
                })
                .catch(reject);
        });
    }

    onEvent(event, sourceEvent) {}
    onUpdateFlag(event) {}
    onSetFlag(event) {}
    onReplaceFlag(event) {}
    onMessage(event) {}
    onCommand(event) {}
    onEditMessage(event) {}
    onReadOutput(event) {}
    onReadInput(event) {}
    onFriendOnline(event) {}
    onFriendOffline(event) {}
    onChatChange(event) {}
    onUserWrite(event) {}
    onUserWriteInChat(event) {}

}

module.exports = Module;