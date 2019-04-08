class Event{
	// string, string, Date, string, string, array of strings
	constructor(id, title, date, description, username, tags){
		this.id = id;
		this.title = title;
		this.date = date;
		this.description = description;
		this.username = username;
		this.tags = tags;
	}
}