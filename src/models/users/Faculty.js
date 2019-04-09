class Faculty extends User{
	constructor(id, username){
		super(id, username);
		this.accessLevel = 2;
	}

	// Add event
	addEvent(event){
		// Takes in event json and wraps "createEvent"
		// JSON should probably be parsed here instead of the EventManager class
		// I think the EventManager class should only deal with inputting data to sql and not parsing it first
		// That applies for all these functions that take in json
	}

	// Edit event
	editEvent(event){

	}

	// Delete event
	deleteEvent(event){

	}
}