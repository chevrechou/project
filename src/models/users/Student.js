import User from './User';
export class Student extends User{
	constructor(id, username){
		super(id, username);
		this.accessLevel = 1;
		//this.id="mike";//comment this out at the end
	}
}
module.exports = Student;