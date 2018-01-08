const Event = require('./Event');

class ReadInputMessage extends Event {

    constructor(data) {
        super(data);

        this.peerId = this.getNextData();
        this.localId = this.getNextData();

        this.chat = this.peerId > 2000000000;
        this.group = !this.chat && this.peerId > 1000000000
    }

    getPeerId() {
        return this.peerId;
    }

    getChatId() {
        return this.isChat() ? this.getPeerId() - 2000000000 : this.getPeerId();
    }

    getGroupId() {
        return this.isGroup() ? this.getPeerId() - 1000000000 : this.getPeerId();
    }

    getLocalId() {
        return this.localId;
    }

    isChat() {
        return this.chat;
    }

    isGroup() {
        return this.group;
    }

}

module.exports = ReadInputMessage;