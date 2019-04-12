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
		if(this.id == event.UserId){
			this.eventManager.editEvent(event.Id, event.Title, event.DateTime, event.Location, event.Description, event.AccessLevel, event.UserId);
		}
		else {
			console.log("User ID does not match owner ID of event");
			return;
		}
	}

	// Delete event
	deleteEvent(EventID){
		if(this.id == event.UserId){
			this.eventManager.deleteEvent(EventID);
		}
		else {
			console.log("User ID does not match owner ID of event");
			return;
		}
	}
};
module.exports = Faculty;