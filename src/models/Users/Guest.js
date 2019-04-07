class Guest extends User{
	constructor(id, username){
		super(id, username);
		this.accessLevel = 0;
	}
}