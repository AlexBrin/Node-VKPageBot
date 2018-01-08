const Event = require('./Event');

class NewMessage extends Event {
    static get FLAGS() {
        return [
            [65536, 'HIDDEN'], [512, 'MEDIA'], [256, 'FIXED'],
            [128, 'DELЕTЕD'], [64, 'SPAM'], [32, 'FRIENDS'],
            [16, 'CHAT'], [8, 'IMPORTANT'], [4, 'REPLIED'],
            [2, 'OUTBOX'], [1, 'UNREAD']
        ];
    }

    constructor(data, command) {
        super(data);

        if(command)
            return;

        this.messageId = this.getNextData();

        this.flags = {};
        let flags = this.getNextData();
        for(let flag in NewMessage.FLAGS)
            this.flags[NewMessage.FLAGS[flag][1]] = Boolean(flags & NewMessage.FLAGS[flag][0]);

        this.peerId = this.getNextData();
        this.timestamp = this.getNextData();
        this.title = this.getNextData();
        this.message = this.getNextData();
        this.attachments = [];
        this.chatUserId = -1;

        let attachments = this.getNextData();
        this.forwardCount = 0;
        this.forwardAllCount = 0;
        this.forwardMessages = [];
        if(attachments.fwd) {
            let fwd = attachments.fwd.split(',');
            this.forwardAllCount = attachments.fwd_all_count;
            for(let i = 0; i < attachments.fwd_count; i++) {
                this.forwardCount++;
                this.forwardMessages.push(parseInt(fwd[i].split('_')[1]));
            }
        }

        if(attachments)
            for(let i = 1; i < 11; i++) {
                if(!('attach' + i in attachments))
                    break;

                let id = attachments['attach' + i].split('_');

                this.attachments.push({
                    type: attachments['attach' + i + '_type'],
                    ownerId: id[0],
                    docId: id[1]
                });
            }

        this.chat = this.peerId > 2000000000;
        this.group = !this.chat && this.peerId > 1000000000;
        if(this.chat) {
            if('from' in attachments) {
                this.chatUserId = attachments.from
            }
        }
        else
            this.peerId = Math.abs(this.peerId);
    }

    isChat() {
        return this.chat;
    }

    isGroup() {
        return this.group;
    }

    getChatUserId() {
        return this.chatUserId;
    }

    getMessageId() {
        return this.messageId;
    }

    getFlags() {
        return this.flags;
    }

    getFlag(flag) {
        flag = flag.toUpperCase();
        if(flag in this.getFlags())
            return this.getFlags()[flag.toUpperCase()];

        return null;
    }

    getPeerId() {
        return this.peerId;
    }
    getChatId() {
        return this.getPeerId();
    }

    getTimestamp() {
        return this.timestamp;
    }

    getTitle() {
        return this.title;
    }

    getMessage() {
        return this.message;
    }

    getAttachments() {
        return this.attachments;
    }

    getForwardCount() {
        return this.forwardCount;
    }

    getFwdCount() {
        return this.getForwardCount();
    }

    getForwandAllCount() {
        return this.forwardAllCount;
    }

    getFwdAllCount() {
        return this.getForwandAllCount();
    }

    getForward() {
        return this.forwardMessages;
    }

    getFwd() {
        return this.getForward();
    }

}

module.exports = NewMessage;