const Event = require('./Event');

class UserWriteInChat extends Event {

    constructor(data) {
        super(data);

        this.userId = this.getNextData();
    }

    getUserId() {
        return this.userId;
    }
}

module.exports = UserWriteInChat;