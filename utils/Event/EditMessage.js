const NewMessage = require('./NewMessage');

class EditMessage extends NewMessage {

    constructor(data) {
        super(data);

        this.edit = true;
    }

    isEdit() {
        return this.edit;
    }

}

module.exports = EditMessage;