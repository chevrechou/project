const User = require('./User.js');
class Faculty extends User{
	constructor(id, username, userManager, eventManager){
		super(id, username, userManager, eventManager);
		this.accessLevel = 2;
	}

	// Add event
	// Takes in event JSON
	addEvent(event){
		this.eventManager.createEvent(event.Title, event.DateTime, event.Location, event.Description, event.AccessLevel, event.UserId);
	}

	// Edit event
	editEvent(event){
		this.eventManager.editEvent(event.Id, event.Title, event.DateTime, event.Location, event.Description, event.AccessLevel, event.UserId);
	}

	// Delete event
	deleteEvent(EventID){
		this.eventManager.deleteEvent(EventID);
	}
};
module.exports = Faculty;