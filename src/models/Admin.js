class Admin extends Faculty{
	constructor(id, username){
		super(id, username);
		this.accessLevel = 3;
	}
}