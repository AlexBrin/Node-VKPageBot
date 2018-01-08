const NewMessage = require('./NewMessage');

class UpdateFlagMessage extends NewMessage {

    constructor(data) {
        super(data);

        this.mask = this.getFlags();
    }

}

module.exports = UpdateFlagMessage;