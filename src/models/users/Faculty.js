const EventManager = require('../../util/EventManager.js');
const User = require('./User.js');
class Faculty extends User{
	constructor(id, username, eventManager){
		super(id, username, eventManager);
		this.accessLevel = 2;
	}

	// Add event
	addEvent(event){
		// Takes in event json and wraps "createEvent"
		// JSON should probably be parsed here instead of the EventManager class
		// I think the EventManager class should only deal with inputting data to sql and not parsing it first
		// That applies for all these functions that take in json
		//this will return a comma separated string of data
		var eventInfo = "'"+event.Title + "'"+ ',' + event.DateTime + ',' + "'"+event.Location + "'"+',' + "'"+event.Description + "'"+ ',' + event.AccessLevel + ',' + event.UserID;
		this.eventManager.createEvent(eventInfo);
	}

	// Edit event
	editEvent(event){
		var eventInfo = event.Title + ',' + event.DateTime + ','+event.Location + ',' +event.Description + ',' + event.AccessLevel + ',' + event.UserID;
		this.eventManager.editEvent(event.EventID, eventInfo);
	}

	// Delete event
	deleteEvent(EventID){
		this.eventManager.deleteEvent(EventID);
	}
}