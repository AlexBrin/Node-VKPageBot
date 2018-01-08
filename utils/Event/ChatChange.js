const Event = require('./Event');

class ChatChange extends Event {

    constructor(data) {
        super(data);

        this.chatId = this.getNextData();
        this.self = this.getNextData();
    }

    getChatId() {
        return this.chatId;
    }

    itIsMe() {
        return this.self === 0;
    }

}

module.exports = ChatChange;