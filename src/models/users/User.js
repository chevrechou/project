const UserManager = require('../../util/UserManager.js');
const EventManager = require('../../util/EventManager.js');
class User{
	// string, string
	constructor(id, username, userManager, eventManager){
		if (this.constructor === User) {
            throw new TypeError("Abstract class "User" cannot be instantiated directly."); 
        }
		this.id = id;
		this.username = username;
        this.userManager = userManager;
        this.eventManager = eventManager;
	}


	// Add favorite
	addFavorite(eventId){
		this.eventManager.addToFavorites(this.id, eventId);
	}

	// Remove favorite
	removeFavorite(eventId){
		this.eventManager.removeFromFavorites(this.id, eventId);
	}

	// Change password
	changePassword(oldPassword, newPassword){
		this.userManager.changePassword(oldPassword, newPassword);
	}
};
module.exports = User;