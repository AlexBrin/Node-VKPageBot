const Module = require('../../utils/Module');

class FriendViewer extends Module {

    constructor(vk, pluginDir) {
        super(vk, pluginDir);
    }

    onFriendOnline(event) {
        this.getUserInfo(event.getUserId())
            .then(user => {
                console.log(user.first_name + ' ' + user.last_name + ' онлайн');
                console.log('Платформа: ' + event.getPlatform());
            });
    }

    onFriendOffline(event) {
        this.getUserInfo(event.getUserId())
            .then(
                user =>
                    console.log(user.first_name + ' ' + user.last_name + ' оффлайн')
            );
    }

}

module.exports = FriendViewer;