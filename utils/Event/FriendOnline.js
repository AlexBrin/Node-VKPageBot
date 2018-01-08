const Event = require('./Event');
const Bot = require('../Bot');

class FriendOnline extends Event {

    constructor(data) {
        super(data);

        this.userId = Math.abs(this.getNextData());
        this.extra = this.getNextData();
        this.platformId = Bot.getPlatformId(this.extra);
        this.timestamp = this.getNextData();
    }

    getUserId() {
        return this.userId;
    }

    getExtra() {
        return this.extra;
    }

    getPlatformId() {
        return this.platformId;
    }

    getPlatform() {
        if(!this.platform)
            this.platform = Bot.getPlatform(this.getPlatformId());

        return this.platform;
    }

}

module.exports = FriendOnline;