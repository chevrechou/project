const Faculty = require('./Faculty.js');
class Admin extends Faculty{
	constructor(id, username, userManager, eventManager){
		super(id, username, userManager, eventManager);
		this.accessLevel = 3;
	}

	// Change access level
	changeAccessLevel(userId, accessLevel){
		this.userManager.changeAccessLevel(userId, accessLevel);
	}
};
module.exports = Admin;