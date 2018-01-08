const NewMessage = require('./NewMessage');

class Command extends NewMessage {

    constructor(event) {
        super([], true);

        this.messageId = event.getMessageId();
        this.flags = event.getFlags();
        this.peerId = event.getPeerId();
        this.timestamp = event.getTimestamp();
        this.title = event.getTitle();
        this.message = event.getMessage();
        this.forwardMessages = event.getFwd();
        this.forwardCount = event.getFwdCount();
        this.forwardAllCount = event.getFwdAllCount();
        this.attachments = event.getAttachments();
        this.chatUserId = event.getChatUserId();
        this.chat = event.isChat();
        this.group = event.isGroup();

        let command = this.message.replace(/\//, '').split(' ');
        this.command = command.shift();
        this.args = command;
    }

    getCommand() {
        return this.command;
    }

    getArgs() {
        return this.args;
    }

}

module.exports = Command;