const Event = require('./Event');

class FriendOffline extends Event {

    constructor(data) {
        super(data);

        this.userId = Math.abs(this.getNextData());
        this.flags = this.getNextData();
        this.timestamp = this.getNextData();
    }

    getUserId() {
        return this.userId;
    }

    getFlags() {
        return this.flags
    }

    isExit() {
        return this.getFlags() === 0;
    }

    isTimeout() {
        return this.getFlags() === 1;
    }

}

module.exports = FriendOffline;