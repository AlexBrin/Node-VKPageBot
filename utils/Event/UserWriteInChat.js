const Event = require('./Event');

class UserWriteInChat extends Event {

    constructor(data) {
        super(data);

        this.userId = this.getNextData();
        this.chatId = this.getNextData();
    }

    getUserId() {
        return this.userId;
    }

    getChatId() {
        return this.chatId;
    }

}

module.exports = UserWriteInChat;