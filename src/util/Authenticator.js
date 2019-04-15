class Authenticator{
	constructor(){

    }
    authenticate(username, password){
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) {
                console.log(err);
                con.end();
            }
            var query = "SELECT UserID, username, accessLevel FROM user WHERE username=" + mysql.escape(username) + " AND password=" + mysql.escape(password);
            con.query(query, function(err, result){
                if(err) {
                    console.log(err);
                    con.end();
                }
                else {
                    var returnString = '';
                    if(result.length == 0){
                        con.end();
                        console.log("Username/Password do not match!")
                        return null;
                    }
                    returnString = result[0].UserID + "," + result[0].username + "," + result[0].accessLevel;
                    console.log(returnString);
                    con.end();
                    return returnString;
                }
            });
        });
    }
    createNewUser(username, email, password){
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) {
                console.log(err);
                con.end();
            }
            var query = "INSERT INTO user (Username, Password, Email, AccessLevel) SELECT " + mysql.escape(username) + ", " + mysql.escape(password) + ", " + mysql.escape(email) + ", 1 FROM DUAL WHERE NOT EXISTS "
            + "(SELECT Username, Password, Email, AccessLevel FROM user WHERE Username="+mysql.escape(username) + ");";
            con.query(query, function(err, result){
                if(err) {
                    console.log(err);
                    con.end();
                }
                else {
                    var returnString = '';
                    if(result.affectedRows == 0){
                        con.end();
                        console.log("Username was taken!")
                        //do something here
                    }
                    else {
                        con.end();
                        //do something here
                    }
                }
            });
        });
    }
}
