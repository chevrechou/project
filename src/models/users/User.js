class User{
	// string, string
	constructor(id, username){
		if (this.constructor === User) {
            throw new TypeError('Abstract class "User" cannot be instantiated directly.'); 
        }
        
		this.id = id;
		this.username = username;
	}


	// Add favorite
	addFavorite(event){
		// This will take in event json and get the id from there
		// Gets id paramater from self since it's stored in the user object
		// Wraps around event manager addtofav method
	}

	// Remove favorite
	removeFavorite(event){
		// Opposite of addFav with same conditions
	}

	// Change password
}