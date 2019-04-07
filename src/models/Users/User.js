class User{
	constructor(id, username){
		if (this.constructor === User) {
            throw new TypeError('Abstract class "User" cannot be instantiated directly.'); 
        }
        
		this.id = id;
		this.username = username;
	}
}