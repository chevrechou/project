class Guest extends User{
	constructor(id, username){
		super(id, username);
		this.accessLevel = 0;
	}

	// Should have no methods since lowest access level
}