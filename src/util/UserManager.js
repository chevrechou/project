class UserManager{
	constructor(){

	}
	
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

	changeAccessLevel(userId, newAccessLevel){
		console.log("Changing user: " + userId + "'access level to " + newAccessLevel);
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
			else {
				var query = "UPDATE user SET AccessLevel=" + newAccessLevel + " WHERE UserID=" + userId;
				con.query(query, function(err, result){
					if(err) {
						console.log(err);
					}
					else {
						console.log("Changed access level!");
					}
					con.end();
				})
			}
		});
	}
	getUsers(){
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
			else {
				var query = "SELECT username, userID, accessLevel FROM user";
				con.query(query, function(err, result){
					if(err) {
						console.log(err);
					}
					else {
						console.log("Changed access level!");
						console.log(result);
					}
					con.end();
				})
			}
		});
	}
};

var um = new UserManager();
um.getUsers();
module.exports = UserManager;