class Event {
    static get EVENTS() {
        return {
            1: require('./UpdateFlagMessage'),
            2: require('./SetFlagMessage'),
            3: require('./ResetFlagMessage'),
            4: require('./NewMessage'),
            5: require('./EditMessage'),
            6: require('./ReadOutputMessage'),
            7: require('./ReadInputMessage'),
            8: require('./FriendOnline'),
            9: require('./FriendOffline'),
            51: require('./ChatChange'),
            61: require('./UserWrite'),
            62: require('./UserWriteInChat'),

            200: require('./Command')
        };
    }

    constructor(data) {
        this.data = data;
    }

    /**
     * Если возвращает -1 - значит данные закончились
     *
     * @returns {*}
     */
    getNextData() {
        if(this.data.length > 1)
            return this.data.shift();
        else
            return -1;
    }

    static createEvent(action, data) {
        if(action in Event.EVENTS)
            return new Event.EVENTS[action](data);

        return null;
    }

}

module.exports = Event;