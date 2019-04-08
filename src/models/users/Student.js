class Student extends User{
	constructor(id, username){
		super(id, username);
		this.accessLevel = 1;
	}
}