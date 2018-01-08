const Module = require('../../utils/Module');

class MessageChecker extends Module {

    constructor(vk, pluginDir) {
        super(vk, pluginDir);

        this.messages = {};
    }

    onMessage(event) {
        let messageId = event.getMessageId();

        if(!(messageId in this.messages))
            this.messages[messageId] = [];

        this.messages[messageId].push(event);
    }

    onEditMessage(event) {
        let messageId = event.getMessageId();

        this.messages[messageId].push(event);
    }

    onCommand(event) {
        // if(event.getFlag('OUTBOX'))
        //     return;

        let fwdId;

        switch(event.getCommand().toLowerCase()) {

            case 'history':
                    if(event.getForward().length === 0)
                        return this.sendMessage(
                            event.getChatId(),
                            'Нужно переслать одно сообщение',
                            {forward_messages: event.getMessageId()});

                    fwdId = event.getForward()[0];

                    let history = [];
                    for(let i in this.getMessageHistory(fwdId)) {
                        let time = new Date(this.getMessageHistory(fwdId)[i].getTimestamp() * 1000);
                        let h  = time.getDay() + '-' + (time.getMonth()+1) + '-' + time.getFullYear() + ' ';
                            h += time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
                            h += ' -- ' + this.getMessageHistory(fwdId)[i].getMessage();
                        history.push(h);
                    }

                    if(history.length === 0)
                        return this.sendMessage(event.getChatId(), 'Я не помню эту историю');
                    history = history.join("\n");

                    this.sendMessage(
                        event.getChatId(),
                        "История сообщения: \n\n" + history,
                        {forward_messages: event.getMessageId()});
                break;

            case 'delete':
                    if(event.getForward().length === 0)
                        return this.sendMessage(
                            event.getChatId(),
                            'Нужно переслать одно сообщение',
                            {forward_messages: event.getMessageId()});
                    fwdId = event.getForward()[0];

                    delete this.messages[fwdId];

                    this.sendMessage(event.getChatId(), 'История сообщения удалена');
                break;

            case 'fulldelete':
                    this.messages = [];
                    this.sendMessage(event.getChatId(), 'Вся история удалена', {forward_messages: event.getMessageId()});
                break;

        }

    }

    getLastMessageById(messageId) {
        let messages = this.getMessageHistory(messageId);

        if(messages === 0)
            return '';

        return messages[messages.length-1];
    }

    getMessageHistory(messageId) {
        if(messageId in this.messages)
            return this.messages[messageId];

        return [];
    }

}

module.exports = MessageChecker;