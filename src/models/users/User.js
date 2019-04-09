const EventManager = require('../../util/EventManager.js');
let em = new EventManager();
class User{
	// string, string
	constructor(id, username, eventManager){
		if (this.constructor === User) {
            throw new TypeError('Abstract class "User" cannot be instantiated directly.'); 
        }
        this.eventManager = eventManager;
		this.id = id;
		this.username = username;
	}


	// Add favorite
	addFavorite(eventID){
		// This will take in event id
		// Gets id paramater from self since it's stored in the user object
		// Wraps around event manager addtofav method
		this.eventManager.addToFavorites(this.id, eventID);
	}

	// Remove favorite
	removeFavorite(eventID){
		// Opposite of addFav with same conditions
		this.eventManager.removeFromFavorites(this.id, eventID);
	}

	// Change password
	changePassword(oldPassword, newPassword){
		var id = this.id
		var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err){
                console.log(err);
                con.end();
            }
			var query = "SELECT password FROM user WHERE userID=" + id;
			console.log(query);
            con.query(query, function(err, result){
                if(err) {
					console.log(err);
					con.end();
				}
				else {
					if(result[0].password ==  oldPassword){
						con.query("UPDATE user SET password=" + mysql.escape(newPassword) + " WHERE userID= " + mysql.escape(id) + ";", function(err, result) {
							console.log("updated!");
							con.end();
						});
					}
					else {
						console.log("Invalid old password");
						con.end();
					}
				}
            })
        })
	}
}
module.exports = User;