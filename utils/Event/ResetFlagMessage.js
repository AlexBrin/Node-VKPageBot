const UpdateFlagMessage = require('./UpdateFlagMessage');

class ResetFlagMessage extends UpdateFlagMessage {

    constructor(data) {
        super(data);
    }

}

module.exports = ResetFlagMessage;